import React, { useState } from 'react';
import { TodoFormProps, Todo } from '../types/interfaces';

const TodoForm: React.FC<TodoFormProps> = ({ onAdd }) => {
    const [title, setTitle] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        const token = localStorage.getItem('token');

        try {
            const response = await fetch('/api/todos', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ title, completed: false }),
            });
            if (!response.ok) {
                throw new Error('Failed to add todo');
            }
            const data: Todo = await response.json();
            onAdd(data);
            setTitle('');
        } catch (error) {
            console.error('Error adding todo:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
            <button className='addBtn' type="submit">Add Todo</button>
        </form>
    );
};

export default TodoForm;
