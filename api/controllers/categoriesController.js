const CategoryDataModel = require('../models/categoriesModel');

exports.createCategory = async (req, res) => {
    const { category } = req.body;

    try {
        // Check if the data with the same category already exists
        const existingData = await CategoryDataModel.findOne({ category });

        if (existingData) {
            return res.status(409).json({
                error: 409, 
                message: `Data with this category - ${category} , already exists`
            });
        }

        const data = new CategoryDataModel({ category });
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getAllCategories = async (req, res) => {
    try {
        const data = await CategoryDataModel.find().sort({ category: 1 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateCategory = async (req, res) => {
    const { id } = req.params;
    const { category } = req.body;

    try {
        // Check if the data with the same category already exists
        const existingData = await CategoryDataModel.findOne({ category });

        if (existingData) {
            return res.status(409).json({
                error: 409, 
                message: `Couldn\'t update the category. ${category} - Category already exists.`
            });
        }

        const data = await CategoryDataModel.findByIdAndUpdate(id, { category }, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
