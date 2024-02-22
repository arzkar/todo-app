import { useState } from 'react';
import styles from '../styles/Login.module.css';
import router from 'next/router';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.status != 500) {
        localStorage.setItem('token', data.token);
        router.push('/');
      }
      else
        throw error;
    } catch (error) {
      setError('Invalid username or password');
    }
  };

  const handleCreateUser = () => {
    router.push('/createUser');
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <div>
          <h1>Login</h1>
        </div>
        <div>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {error && <div className={styles.error}>{error}</div>}
        <button type="submit">Login</button>
        <button type="button" className='loginBtn' onClick={handleCreateUser}>Create User</button>
      </form>
    </div>
  );
};

export default Login;
