const mongoose = require('mongoose');

const RequestModel = new mongoose.Schema({
    requestor: { 
        type: String, 
        required: true,
    },
    requestedFor: {
        type: String,
    },
    reason: {
        type: String,
        required: true,
    },
    description: {
        type: String
    }
}, {
    timestamps: true,
    collection: 'prayer_requests'
});

module.exports = mongoose.model('RequestData', RequestModel);