import { jwtDecode, JwtPayload } from 'jwt-decode';

class AuthService {
  // Decode the token and return the user profile
  getProfile() {
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null;
  }

  // Check if the user is logged in
  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  // Check if the token is expired
  isTokenExpired(token: string) {
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (decoded.exp) {
        return decoded.exp * 1000 < Date.now(); // Convert exp to milliseconds
      }
      return false;
    } catch (error) {
      return true;
    }
  }

  // Retrieve the token from localStorage
  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  // Save the token to localStorage and redirect to the home page
  login(idToken: string) {
    localStorage.setItem('token', idToken);
    window.location.assign('/');
  }

  // Remove the token from localStorage and redirect to the login page
  logout() {
    localStorage.removeItem('token');
    window.location.assign('/login');
  }
}

export default new AuthService();