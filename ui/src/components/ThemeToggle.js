// src/components/ThemeToggle.js
import React, { useContext } from 'react';
import { IconButton } from '@mui/material';
import { Brightness4, Brightness7 } from '@mui/icons-material';
import { ThemeContext } from '../theme/ThemeContext';

const ThemeToggle = () => {
  const { toggleTheme } = useContext(ThemeContext);

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      <Brightness7 />
    </IconButton>
  );
};

export default ThemeToggle;
