import axios from 'axios';

const API_URL = 'https://test.v5.pryaniky.com/ru/data/v3/testmethods/docs';

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    console.log('Login response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};