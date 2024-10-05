import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

// Fetch all categories
export const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getCategories`);
      return response.data;
    } catch (error) {
      console.error('Error fetching categories:', error);
      throw error;
    }
};

export const createCategory = async (categoryData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/createCategory`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}

export const editCategory = async (id, categoryData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/editCategory/${id}`, categoryData);
        return response.data;
    } catch (error) {
        console.error('Error updating category:', error);
        throw error;
    }
}