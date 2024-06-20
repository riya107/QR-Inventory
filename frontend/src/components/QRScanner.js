import React, { useState } from 'react';
import jsQR from 'jsqr';

const QRScanner = () => {
    const [result, setResult] = useState('');

    const handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    canvas.width = img.width;
                    canvas.height = img.height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, img.width, img.height);
                    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                    const code = jsQR(imageData.data, imageData.width, imageData.height);
                    if (code) {
                        setResult(code.data);
                    } else {
                        setResult('No QR code found');
                    }
                };
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <div>
            <input type="file" accept="image/png, image/jpeg" onChange={handleFileUpload} />
            <p>{result}</p>
        </div>
    );
};

export default QRScanner;
