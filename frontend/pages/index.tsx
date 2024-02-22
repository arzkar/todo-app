import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Todo } from '../types/interfaces';
import useRequireAuth from '../hooks/useRequireAuth';
import router from 'next/router';

const Home: React.FC = () => {
  useRequireAuth();
  
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/login');
  };

  const handleAccDeletion = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await fetch(`/api/users`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Error deleting account:', error);
    }
    localStorage.removeItem('token');
    router.push('/login');
  };

  return (
    <React.Fragment>
      <button className='logoutBtn' onClick={handleLogout}>Logout</button>
      <button className='logoutBtn' onClick={handleAccDeletion}>Delete Account</button>
      <div className="todo-container">
        <h1>Todo</h1>
        <div className="todo-form">
          <TodoForm onAdd={handleAddTodo} setTodos={setTodos} />
        </div>
        <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </React.Fragment>
  );
};
export default Home;
