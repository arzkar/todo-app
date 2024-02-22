import React, { useEffect, useState } from 'react';
import { TodoListProps, Todo } from '../types/interfaces';

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string>('');

  useEffect(() => {
    const fetchTodos = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('/api/todos', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          throw new Error('Failed to fetch todos');
        }
        const data: Todo[] = await response.json();
        setTodos(data);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
    fetchTodos();
  }, [setTodos]);

  const handleEditTodo = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title: editTitle }),
      });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, title: editTitle } : todo
        )
      );
      setEditingId(null);
    } catch (error) {
      console.error('Error editing todo:', error);
    }
  };

  const toggleCompletion = async (id: number, completed: boolean) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ completed: !completed }),
      });
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id ? { ...todo, completed: !completed } : todo
        )
      );
    } catch (error) {
      console.error('Error toggling completion:', error);
    }
  };

  const deleteTodo = async (id: number) => {
    const token = localStorage.getItem('token');

    try {
      await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCompletion(todo.id, todo.completed)}
            />
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  value={editTitle}
                  onChange={e => setEditTitle(e.target.value)}
                />
                <button onClick={() => handleEditTodo(todo.id)}>Save</button>
              </>
            ) : (
              <>
                <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>{todo.title}</span>
              </>
            )}
          </div>
          <div>
            <button className='editBtn' onClick={() => setEditingId(todo.id)}>Edit</button>
            <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;

