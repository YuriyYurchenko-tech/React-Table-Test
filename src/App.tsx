import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setToken } from './redux/auth/authSlice';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TablePage from './components/pages/TablePage/TablePage';
import ProtectedRoute from './HOCs/ProtectedRoute';
import Header from './components/ui/Header/Header';
import './App.css';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state: RootState) => state.auth);

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
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/table" element={<TablePage />} />
          </Route>
        </Routes>
      </main>
    </div>
  );
};

export default App;