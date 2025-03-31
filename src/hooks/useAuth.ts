import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { login } from '../services/authService';
import { setToken, logout } from '../redux/auth/authSlice';
import { RootState } from '../redux/store';
import type { AuthFormDataType } from '../types/userTypes';

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

  const handleLogin = async (username: AuthFormDataType['username'], password: AuthFormDataType['password']) => {
    try {
      setLoading(true);
      setError(null);
      const response = await login(username, password);
      dispatch(setToken(response.data.token));
      navigate('/table');
    } catch (err) {
      setError('Invalid credentials');
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  return { 
    handleLogin, 
    handleLogout, 
    loading, 
    error,
    isAuthenticated 
  };
};