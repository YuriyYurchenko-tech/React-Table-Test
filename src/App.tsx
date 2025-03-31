import React from 'react';
import { useEffect } from 'react';
import { useRoutes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setToken } from './redux/auth/authSlice';
import LoginPage from './components/pages/LoginPage/LoginPage';
import TablePage from './components/pages/TablePage/TablePage';
import ProtectedRoute from './HOCs/ProtectedRoute';
import Header from './components/ui/Header/Header';
import './App.css';

function App(): React.JSX.Element {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      dispatch(setToken(token));
    }
  }, [dispatch]);

  const routes = useRoutes([
    { path: '/', element: <LoginPage /> },
    { 
      element: <ProtectedRoute />,
      children: [
        { path: '/table', element: <TablePage /> }
      ]
    }
  ]);

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {routes}
      </main>
    </div>
  );
}

export default App;