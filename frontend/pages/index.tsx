import React, { useState } from 'react';
import TodoList from '../components/TodoList';
import TodoForm from '../components/TodoForm';
import { Todo } from '../types/interfaces';

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleAddTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  return (
    <div className="container">
      <h1>Todo</h1>
      <div className="form-container">
      <TodoForm onAdd={handleAddTodo} setTodos={setTodos} />
      <TodoList todos={todos} setTodos={setTodos} />
      </div>
    </div>
  );
};
export default Home;
