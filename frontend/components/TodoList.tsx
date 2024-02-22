import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Todo, TodoListProps } from '../types/interfaces';

const TodoList: React.FC<TodoListProps> = ({ todos, setTodos }) => {

  useEffect(() => {
    const fetchTodos = async () => {
      const response = await axios.get<Todo[]>('/api/todos');
      setTodos(response.data);
    };
    fetchTodos();
  }, [todos]);

  const deleteTodo = async (id: number) => {
    await axios.delete(`/api/todos/${id}`);
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  return (
    <ul>
      {todos.map(todo => (
        <li key={todo.id}>
          {todo.title}  
          <button className='deleteBtn' onClick={() => deleteTodo(todo.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;