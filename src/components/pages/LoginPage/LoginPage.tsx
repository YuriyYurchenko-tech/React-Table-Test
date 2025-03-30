import React, { useState } from 'react';
import { TextField, Button, Container, Typography, CircularProgress, Box } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import styles from './LoginPage.module.css';
import Header from '../../ui/Header/Header';

export default function LoginPage(): React.JSX.Element {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { handleLogin, loading, error } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLogin(username, password);
  };

  return (
    <Container maxWidth="sm">
      <form  onSubmit={handleSubmit} className={styles.loginContainer}>
        <Typography variant="h4" className={styles.loginTitle}>
          Login
        </Typography>
        
        <TextField
          className={styles.loginTextField}
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          required
        />
        
        <TextField
          className={styles.loginTextField}
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={styles.loginButton}
          disabled={loading}
          fullWidth
        >
          {loading ? <CircularProgress /> : 'Login'}
        </Button>
        
        {error && (
          <Typography className={styles.errorMessage}>
            {error}
          </Typography>
        )}
      </form>
    </Container>
  );
};
