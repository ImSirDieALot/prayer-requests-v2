import React, {useState, useEffect} from 'react';
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  TextField,
  CircularProgress,
  Snackbar,
  Alert,
  Button,
} from '@mui/material';
import { Edit, Save, Cancel, Add } from '@mui/icons-material';
import { fetchCategories, editCategory, createCategory } from '../api/categories';

const AddCategories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState(null); // ID of the category being edited
  const [editText, setEditText] = useState(''); // Text of the category being edited
  const [error, setError] = useState('');
  const [newCategory, setNewCategory] = useState('');

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error) {
        console.error('Failed to load categories:', error);
        setError('Failed to load users. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const handleEditClick = (category) => {
    setEditId(category._id);
    setEditText(category.category);
  };

  const handleSaveClick = async (categoryId) => {
    try {
      const updatedCategory = await editCategory(categoryId, { category: editText });
      setCategories(categories.map((category) => (category._id === categoryId ? updatedCategory : category)));
      setEditId(null); // Exit edit mode
    } catch (error) {
      console.error('Failed to save category:', error);
      setError(`${error.response.data.message}`);
    }
  };

  const handleCreateCategory = async () => {
    if (!newCategory.trim()) return; // Don't add if the input is empty
    try {
      const newAddCategory = await createCategory({ category: newCategory });
      setCategories([...categories, newAddCategory]);
      setNewCategory(''); // Clear the input field after adding
    } catch (error) {
      console.error('Failed to add category:', error);
      setError(`${error.response.data.message}`);
    }
  };

  const handleCancelClick = () => {
    setEditId(null); // Exit edit mode without saving
  };

  const handleCloseError = () => {
    setError(''); // Clear the error message
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
    <List sx={{ width: '80%', maxWidth: 720, margin: 'auto' }}>
      {/* Input for adding a new user */}
      <ListItem>
          <TextField
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
            placeholder="Add new category"
            fullWidth
          />
          <IconButton onClick={handleCreateCategory}>
            <Add />
          </IconButton>
        </ListItem>
      {categories.map((category) => (
        <ListItem key={category._id} divider>
          {editId === category._id ? (
            <>
              <TextField
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                fullWidth
              />
              <IconButton onClick={() => handleSaveClick(category._id)}>
                <Save />
              </IconButton>
              <IconButton onClick={handleCancelClick}>
                <Cancel />
              </IconButton>
            </>
          ) : (
            <>
              <ListItemText primary={category.category} />
              <IconButton onClick={() => handleEditClick(category)}>
                <Edit />
              </IconButton>
            </>
          )}
        </ListItem>
      ))}
    </List>
    {/* Error Message */}
    <Snackbar
    open={!!error}
    autoHideDuration={6000}
    onClose={handleCloseError}
    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
  >
    <Alert onClose={handleCloseError} severity="error">
      {error}
    </Alert>
  </Snackbar>
  </>
  )
}

export default AddCategories
