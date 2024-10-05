import React, {useEffect, useState} from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  IconButton,
  Button,
  Select,
  MenuItem,
  CircularProgress,
  Snackbar,
  Alert,
  Typography,
} from '@mui/material';
import { Edit, Delete, Save, Cancel } from '@mui/icons-material';
import { fetchAllRequests, createRequest, updateRequest, deleteRequest } from '../api/requests';
import { fetchCategories } from '../api/categories';

const NewRequests = () => {
  const formattedDate = new Date().toLocaleDateString();
  const [allRequests, setAllRequests] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [editId, setEditId] = useState(null);
  const [newRequest, setNewRequest] = useState({ 
    requestor: '', 
    requestedFor: '', 
    reason: '', 
    description: '' 
  });

  useEffect(() => {
    const loadRequestsCategoriesData = async () => {
      try {
        const [requestsData, categoriesData] = await Promise.all([fetchAllRequests(), fetchCategories()]);
        setAllRequests(requestsData);
        setCategories(categoriesData);
      } catch (error) {
          console.error('Failed to load allRequests:', error);
          setError('Failed to load allRequests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    loadRequestsCategoriesData();
  }, []);

  const handleEditClick = (requestId) => {
    setEditId(requestId);
  };

  const handleSaveClick = async (requestId) => {
    const requestData = allRequests.find((request) => request._id === requestId);
    try {
      const updatedRequest = await updateRequest(requestId, requestData);
      setAllRequests(allRequests.map((req) => (req._id === requestId ? updatedRequest : req)));
      setEditId(null);
    } catch (error) {
      console.error('Failed to save request:', error);
      setError('Failed to save changes. Please try again.');
    }
  };

  const handleCancelClick = () => {
    setEditId(null);
  };

  const handleCreateRequest = async () => {
    try {
      const newCreatedRequest = await createRequest(newRequest);
      setAllRequests([newCreatedRequest, ...allRequests]);
      // setAllRequests([...allRequests, newCreatedRequest]);
      setNewRequest({ requestor: '', requestedFor: '', reason: '', description: '' });
    } catch (error) {
      console.error('Failed to create request:', error);
      setError('Failed to create request. Please try again.');
    }
  };

  const handleInputChange = (e, requestId = null) => {
    const { name, value } = e.target;
    if (requestId) {
      setAllRequests(
        allRequests.map((request) =>
          request._id === requestId ? { ...request, [name]: value } : request
        )
      );
    } else {
      setNewRequest({ ...newRequest, [name]: value });
    }
  };

  const handleDeleteClick = async (requestId) => {
    try {
      await deleteRequest(requestId);
      setAllRequests(allRequests.filter((request) => request._id !== requestId));
    } catch (error) {
      console.error('Failed to delete request:', error);
      setError('Failed to delete request. Please try again.');
    }
  };

  const handleCloseError = () => {
    setError('');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
    <Typography variant='h5' sx={{ margin: 2 }}>
      Today's Prayer Requests - {formattedDate}
    </Typography>

      <TableContainer>
        <Table>
        <TableHead>
            <TableRow>
              <TableCell>Requestor</TableCell>
              <TableCell>Requested For</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
          <TableRow>
              <TableCell>
                <TextField
                  name="requestor"
                  value={newRequest.requestor}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Requestor"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <TextField
                  name="requestedFor"
                  value={newRequest.requestedFor}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Requested For"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Select
                  name="reason"
                  value={newRequest.reason}
                  onChange={(e) => handleInputChange(e)}
                  fullWidth
                >
                  {categories.map((category) => (
                    <MenuItem key={category._id} value={category.category}>
                      {category.category}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <TextField
                  name="description"
                  value={newRequest.description}
                  onChange={(e) => handleInputChange(e)}
                  placeholder="Description"
                  fullWidth
                />
              </TableCell>
              <TableCell>
                <Button onClick={handleCreateRequest} variant="contained" color="primary">
                  Save
                </Button>
              </TableCell>
            </TableRow>

            {/* Existing requests */}
            {allRequests.map((request) => (
              <TableRow key={request._id}>
                <TableCell>
                  {editId === request._id ? (
                    <TextField
                      name="requestor"
                      value={request.requestor}
                      onChange={(e) => handleInputChange(e, request._id)}
                      fullWidth
                    />
                  ) : (
                    request.requestor
                  )}
                </TableCell>
                <TableCell>
                  {editId === request._id ? (
                    <TextField
                      name="requestedFor"
                      value={request.requestedFor}
                      onChange={(e) => handleInputChange(e, request._id)}
                      fullWidth
                    />
                  ) : (
                    request.requestedFor
                  )}
                </TableCell>
                <TableCell>
                  {editId === request._id ? (
                    <Select
                      name="reason"
                      value={request.reason}
                      onChange={(e) => handleInputChange(e, request._id)}
                      fullWidth
                    >
                      {categories.map((category) => (
                        <MenuItem key={category._id} value={category._id}>
                          {category.category}
                        </MenuItem>
                      ))}
                    </Select>
                  ) : (
                    categories.find((category) => category.category === request.reason)?.category
                  )}
                </TableCell>
                <TableCell>
                  {editId === request._id ? (
                    <TextField
                      name="description"
                      value={request.description}
                      onChange={(e) => handleInputChange(e, request._id)}
                      fullWidth
                    />
                  ) : (
                    request.description
                  )}
                </TableCell>
                <TableCell>
                  {editId === request._id ? (
                    <>
                      <IconButton onClick={() => handleSaveClick(request._id)}>
                        <Save />
                      </IconButton>
                      <IconButton onClick={handleCancelClick}>
                        <Cancel />
                      </IconButton>
                    </>
                  ) : (
                    <>
                      <IconButton onClick={() => handleEditClick(request._id)}>
                        <Edit />
                      </IconButton>
                      <IconButton onClick={() => handleDeleteClick(request._id)}>
                        <Delete />
                      </IconButton>
                    </>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

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

export default NewRequests
