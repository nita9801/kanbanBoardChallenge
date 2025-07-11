
import { UserLogin } from "../interfaces/UserLogin";

const login = async (userInfo: UserLogin) => {
  //  make a POST request to the login route
  try {
      const response = await fetch('http://localhost:3002/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('User information not retrived, check network tab!');
      }

      return data;
  } catch (err) {
    console.log('Error from user login: ', err);
    return Promise.reject('Could not fetch user info');
  }
};

export { login };