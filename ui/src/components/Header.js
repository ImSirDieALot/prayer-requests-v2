// src/components/Header.js
import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import ThemeToggle from './ThemeToggle';

const Header = () => (
  <AppBar position="static">
    <Toolbar>
      <Typography variant="h4" component="div" sx={{ flexGrow: 1, }}>
        Prayer Requests Application
      </Typography>
      <ThemeToggle />
    </Toolbar>
  </AppBar>
);

export default Header;
