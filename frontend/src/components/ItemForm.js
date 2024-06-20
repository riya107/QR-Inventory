import React, { useState } from 'react';
import { createItem } from '../services/itemService';

const ItemForm = () => {
    const [name, setName] = useState('');
    const [dateReceived, setDateReceived] = useState('');
    const [component, setComponent] = useState('c1');
    const [qrCode, setQRCode] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const item = { name, dateReceived, component };
        const { data } = await createItem(item);
        setQRCode(data.qrCode);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="date"
                    value={dateReceived}
                    onChange={(e) => setDateReceived(e.target.value)}
                />
                <select value={component} onChange={(e) => setComponent(e.target.value)}>
                    <option value="c1">c1</option>
                    <option value="c2">c2</option>
                    <option value="c3">c3</option>
                    <option value="c4">c4</option>
                    <option value="c5">c5</option>
                </select>
                <button type="submit">Generate QR Code</button>
            </form>
            {qrCode && (
                <div>
                    <img src={qrCode} alt="QR Code" />
                    <a href={qrCode} download="qr-code.png">Download QR Code</a>
                </div>
            )}
        </div>
    );
};

export default ItemForm;
