const login = async (userInfo: { username: string; password: string }): Promise<{ token: string }> => {
  const API_URL = 'http://localhost:3002/api/auth/login';
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userInfo),
  });

  if (!response.ok) {
    throw new Error('Login failed');
  }

  return response.json(); // Ensure this returns `{ token: string }`
};

export { login };