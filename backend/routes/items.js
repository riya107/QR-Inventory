const express = require('express');
const { createItem, getItems, updateItem, deleteItem } = require('../controllers/itemController');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');

// Public Routes
router.post('/', createItem);
router.get('/', getItems);

// Admin Routes (Require Authentication)

router.put('/:id', authMiddleware, updateItem);
router.delete('/:id', authMiddleware, deleteItem);

module.exports = router;
