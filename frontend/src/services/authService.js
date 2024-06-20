import axios from 'axios';

export const register = async (user) => {
    const response = await axios.post('/api/auth/register', user);
    localStorage.setItem('token', response.data.token);
    return response;
};

export const login = async (user) => {
    const response = await axios.post('/api/auth/login', user);
    localStorage.setItem('token', response.data.token);
    return response;
};

export const getCurrentUser = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;
    return JSON.parse(atob(token.split('.')[1]));
};

export const logout = () => {
    localStorage.removeItem('token');
};
