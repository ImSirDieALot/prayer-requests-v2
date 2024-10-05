import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

export const fetchAllRequests = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/getRequests`);
        return response.data;
      } catch (error) {
        console.error('Error fetching requests:', error);
        throw error;
      }
}

export const fetchAllRequestsByDate = async () => {
  try {
      const response = await axios.get(`${API_BASE_URL}/getPrayerRequestsByDate`);
      return response.data;
    } catch (error) {
      console.error('Error fetching requests:', error);
      throw error;
    }
}

export const createRequest = async (requestData) => {
  try {
      const response = await axios.post(`${API_BASE_URL}/createRequest`, requestData);
      return response.data;
  } catch (error) {
      console.error('Error creating request:', error);
      throw error;
  }
}

export const updateRequest = async (id, updateData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/editRequest/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating the request:', error);
    throw error
  }
}

export const deleteRequest = async (id) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/deleteRequest/${id}`);
    return response.data
  } catch (error) {
    console.error('Error deleting the request: ', error);
    throw error;
  }
}