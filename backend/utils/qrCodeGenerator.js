const QRCode = require('qrcode');

const generateQRCode = async (text) => {
    try {
        const qrCodeData = await QRCode.toDataURL(text);
        return qrCodeData;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { generateQRCode };
