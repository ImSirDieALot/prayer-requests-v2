const express = require('express');
const { createCategory, getAllCategories, updateCategory } = require('../controllers/categoriesController');

const router = express.Router();

router.post('/createCategory', createCategory);
router.get('/getCategories', getAllCategories);
router.put('/editCategory/:id', updateCategory);

module.exports = router;
