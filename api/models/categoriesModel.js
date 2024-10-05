const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    category: { 
        type: String, 
        required: true, 
        unique: true 
    },
}, {
    timestamps: true,
    collection: 'prayer_categories'
});

module.exports = mongoose.model('CategoryData', CategorySchema);
