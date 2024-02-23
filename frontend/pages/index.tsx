// Copyright 2024 Arbaaz Laskar

// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at

//   http://www.apache.org/licenses/LICENSE-2.0

// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
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
