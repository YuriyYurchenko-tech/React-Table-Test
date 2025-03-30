import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../../../hooks/useAuth';
import styles from './Header.module.css';

export default function Header(): React.JSX.Element {
  const { handleLogout, isAuthenticated } = useAuth();

  return (
    <AppBar position="static" className={styles.header}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Document Management System
        </Typography>
        
        {isAuthenticated && (
          <Button 
            color="inherit" 
            onClick={handleLogout}
            className={styles.logoutButton}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};
