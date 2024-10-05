// src/components/NavBar.js
import React from 'react';
import { AppBar, Toolbar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Button component={Link} to="/" color="inherit">
        Home
      </Button>
      <Button component={Link} to="/newRequests" color="inherit">
        Today's Requests
      </Button>
      <Button component={Link} to="/addCategory" color="inherit">
        Add Categories
      </Button>
    </Toolbar>
  </AppBar>
);

export default NavBar;
