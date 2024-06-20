import axios from 'axios';
import { getCurrentUser } from './authService';

export const createItem = async (item) => {
    return await axios.post('/api/items', item);
};

export const getItems = async () => {
    return await axios.get('/api/items');
};

export const updateItem = async (id, item) => {
    const user = getCurrentUser();
    return await axios.put(`/api/items/${id}`, item, {
        headers: { Authorization: user.token }
    });
};

export const deleteItem = async (id) => {
    const user = getCurrentUser();
    return await axios.delete(`/api/items/${id}`, {
        headers: { Authorization: user.token }
    });
};
