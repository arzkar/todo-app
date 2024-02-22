import React, { useState } from 'react';
import router from 'next/router';
import styles from '../styles/Login.module.css';

const CreateUserPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleCreateUser = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        router.push('/login');
      } else {
        setError('Failed to create user');
      }
    } catch (error) {
      setError('Failed to create user');
    }
  };
  

  return (
    <div className={styles.container}> 
      <h1>Create User</h1>
      {error && <div>{error}</div>}
      <form className={styles.form} onSubmit={handleCreateUser}> 
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Create User</button>
      </form>
    </div>
  );
};

export default CreateUserPage;
