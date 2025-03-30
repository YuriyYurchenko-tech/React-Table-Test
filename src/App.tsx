import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/auth/authSlice';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TablePage from './components/pages/TablePage/TablePage';
import ProtectedRoute from './HOCs/ProtectedRoute';
import Header from './components/ui/Header/Header';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/table" element={<TablePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;