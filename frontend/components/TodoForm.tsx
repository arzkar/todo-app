import React, { useState } from 'react';
import axios from 'axios';
import { TodoFormProps, Todo } from '../types/interfaces';

const TodoForm: React.FC<TodoFormProps> = ({ onAdd, setTodos }) => {
    const [title, setTitle] = useState<string>('');
  
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        // Add a new todo
        let response = await axios.post<Todo>('/api/todos', { title, completed: false });
        onAdd(response.data);
        setTitle('');
      };
  
    return (
      <form onSubmit={handleSubmit}>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        <button className='addBtn' type="submit">Add Todo</button>
      </form>
    );
  };


export default TodoForm;