const express = require('express');
const { createRequest, getAllRequests, getPrayerRequestsGroupedByDate, updateRequest, deleteRequest } = require('../controllers/requestsController');

const router = express.Router();

router.post('/createRequest', createRequest);
router.get('/getRequests', getAllRequests);
router.get('/getPrayerRequestsByDate', getPrayerRequestsGroupedByDate);
router.put('/editRequest/:id', updateRequest);
router.delete('/deleteRequest/:id', deleteRequest);

module.exports = router;
