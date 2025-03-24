import axios from 'axios';

interface LoginResponse {
  token: string;
  user: { id: number; username: string };
}

const login = async (username: string, password: string): Promise<any> => {
  const API_URL = 'http://localhost:3001/api/auth';
  try {
    const response = await axios.post(`${API_URL}/login`, { username, password });
    return response.data;
    localStorage.setItem('token', response.data.token);
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message || 'Login failed');
      console.error(error);
    }
    throw new Error('An unknown error occurred');
  }
};



export { login };
