import axios from 'axios';

const login = async (username: string, password: string) => {
  const API_URL = 'http://localhost:3001/api/auth';
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error('An unknown error occurred');
    }
  }
};



export { login };
