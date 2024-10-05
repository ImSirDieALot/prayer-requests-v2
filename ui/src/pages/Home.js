import React, { useEffect, useState } from 'react';
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
import { fetchAllRequestsByDate } from '../api/requests';
import RequestsTable from '../components/RequestsTable';

const Home = () => {
  const [dataByDate, setDatabyDate] = useState([]);
  const [ loading, setLoading ] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadDataByDate = async () => {
      try {
        const data = await fetchAllRequestsByDate();
        setDatabyDate(data);
      } catch (error) {
        console.error('Failed to load requests by date:', error);
        setError('Failed to load requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    loadDataByDate();
  }, []);

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <>
      Latest Requests
      <div>
        {dataByDate.map( item => (
            <RequestsTable key={item._id} date={item.date} prayerRequests={item.prayerRequests} />
          ))}
      </div>
    </>
  )
}

export default Home
