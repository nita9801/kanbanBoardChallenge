
import { UserLogin } from '../interfaces/UserLogin';

interface LoginResponse {
  token: string;
  user: { id: number; username: string };
}



const login = async (userInfo: UserLogin): Promise<LoginResponse> => {
  const API_URL = 'http://localhost:3001/api/auth/login';
  try {
    // Make a POST request to the login route
    const response = await axios.post<LoginResponse>(API_URL, userInfo);

    // Save the token to localStorage
    localStorage.setItem('token', response.data.token);

    // Return the response data
    return response.data;
  } catch (error) {
    
    // Handle other unknown errors
    throw new Error('An unknown error occurred');
  }
};

export { login };