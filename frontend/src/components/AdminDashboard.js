import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
    const [items, setItems] = useState([]);
    const [editItem, setEditItem] = useState(null);
    const [updatedItem, setUpdatedItem] = useState({});

    useEffect(() => {
        const fetchItems = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('/api/items', {
                headers: { Authorization: token }
            });
            setItems(response.data);
        };
        fetchItems();
    }, []);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            await axios.delete(`/api/items/${id}`, {
                headers: { Authorization: token }
            });
            setItems(items.filter(item => item._id !== id));
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleEdit = (item) => {
        setEditItem(item);
        setUpdatedItem({ ...item });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdatedItem({ ...updatedItem, [name]: value });
    };

    const handleUpdate = async (id) => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`/api/items/${id}`, updatedItem, {
                headers: { Authorization: token }
            });
            setItems(items.map(item => (item._id === id ? response.data : item)));
            setEditItem(null);
        } catch (error) {
            console.error('Error updating item:', error);
        }
    };

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Date Received</th>
                        <th>Component</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {items.map(item => (
                        <tr key={item._id}>
                            <td>{item.name}</td>
                            <td>{item.dateReceived}</td>
                            <td>{item.component}</td>
                            <td>
                                <button onClick={() => handleEdit(item)}>Edit</button>
                                <button onClick={() => handleDelete(item._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editItem && (
                <div>
                    <h2>Edit Item</h2>
                    <form onSubmit={(e) => { e.preventDefault(); handleUpdate(editItem._id); }}>
                        <input
                            type="text"
                            name="name"
                            value={updatedItem.name}
                            onChange={handleChange}
                        />
                        <input
                            type="date"
                            name="dateReceived"
                            value={updatedItem.dateReceived}
                            onChange={handleChange}
                        />
                        <select
                            name="component"
                            value={updatedItem.component}
                            onChange={handleChange}
                        >
                            <option value="c1">C1</option>
                            <option value="c2">C2</option>
                            <option value="c3">C3</option>
                            <option value="c4">C4</option>
                            <option value="c5">C5</option>
                        </select>
                        <button type="submit">Update</button>
                        <button onClick={() => setEditItem(null)}>Cancel</button>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;
