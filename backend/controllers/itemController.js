const Item = require('../models/Item');
const { generateQRCode } = require('../utils/qrCodeGenerator');

exports.createItem = async (req, res) => {
    const { name, dateReceived, component } = req.body;

    try {
        const qrCode = await generateQRCode(`${name} - ${dateReceived}`);
        const newItem = new Item({ name, dateReceived, component, qrCode });

        await newItem.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getItems = async (req, res) => {
    try {
        const items = await Item.find();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;
        const item = await Item.findByIdAndUpdate(id, updatedData, { new: true });
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const item = await Item.findByIdAndDelete(id);
        if (!item) return res.status(404).json({ message: 'Item not found' });
        res.status(200).json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
