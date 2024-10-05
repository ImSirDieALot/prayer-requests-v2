const RequestDataModel = require('../models/requestModel');

exports.createRequest = async (req, res) => {
    const { requestor, requestedFor, reason, description } = req.body;

    try {
        // We don't have to check for existing data.
        // Prayer Requests can be duplicate

        const data = new RequestDataModel({ requestor, requestedFor, reason, description });
        await data.save();
        res.status(201).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// exports.getAllRequests = async (req, res) => {
//     try {
//         const data = await RequestDataModel.find().sort({ createdAt: -1 });
//         res.status(200).json(data);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error', error });
//     }
// };

exports.getAllRequests = async (req, res) => {
    try {
        // Get today's date at midnight (start of the day)
        const todayStart = new Date();
        todayStart.setHours(0, 0, 0, 0);

        // Get the end of today (start of the next day)
        const todayEnd = new Date(todayStart);
        todayEnd.setDate(todayEnd.getDate() + 1);

        // Fetch records created today
        const data = await RequestDataModel.find({
            createdAt: { $gte: todayStart, $lt: todayEnd }
        }).sort({ createdAt: -1 });

        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.getPrayerRequestsGroupedByDate = async (req, res) => {
    try {
        // const data = await RequestDataModel.aggregate([
        //     {
        //         $group: {
        //             _id: {
        //                 $dateToString: { 
        //                     format: "%Y-%m-%d", // Formatting date as "YYYY-MM-DD"
        //                     date: "$createdAt"
        //                 }
        //             },
        //             prayerRequests: { $push: "$$ROOT" },
        //             count: { $sum: 1 }
        //         }
        //     },
        //     {
        //         $sort: { _id: -1 } // Sort by date in descending order
        //     }
        // ]);
        const data = await RequestDataModel.aggregate([
            {
                $group: {
                    _id: {
                        $dateToString: { 
                            format: "%Y-%m-%d", 
                            date: "$createdAt", 
                            timezone: "America/New_York" // Replace with your local timezone
                        }
                    },
                    prayerRequests: { $push: "$$ROOT" },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { _id: -1 } // Sort by date in descending order
            }
        ]);

        // Example of further formatting in the application layer:
        const formattedData = data.map(group => ({
            date: new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(group._id)),
            prayerRequests: group.prayerRequests,
            count: group.count
        }));

        res.status(200).json(formattedData);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.updateRequest = async (req, res) => {
    const { id } = req.params;
    const { requestor, requestedFor, reason, description } = req.body;

    try {
        const data = await RequestDataModel.findByIdAndUpdate(id, { requestor, requestedFor, reason, description }, { new: true });
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

exports.deleteRequest = async (req, res) => {
    const { id } = req.params;

    try {
        const data = await RequestDataModel.findByIdAndDelete(id);
        if (!data) {
            return res.status(404).json({ message: 'Data not found' });
        }
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
}