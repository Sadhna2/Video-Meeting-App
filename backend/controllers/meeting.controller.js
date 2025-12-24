const { Meeting } = require('../models/Meeting');
const { User } = require('../models/User');

const addToHistory = async (req, res) => {
    try {
        const { token, meetingCode } = req.body;
        if (!token || !meetingCode) {
            return res.status(400).json({ message: "all fields are required" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "token expired" });
        }

        const meeting = new Meeting({
            user_id: user.username,
            meetingCode
        });
        await meeting.save();

        res.status(201).json({ message: "meeting added" });

    } catch (e) {
        res.status(500).json({ message: `Error: ${e}` });
    }
}

const getUserHistory = async (req, res) => {
    try {
        const { token } = req.query;
        if (!token) {
            return res.status(400).json({ message: "token not found" });
        }

        const user = await User.findOne({ token });
        if (!user) {
            return res.status(401).json({ message: "token invalid or expired" });
        }

        const meetings = await Meeting.find({ user_id: user.username });
        res.status(200).json({ meetings });

    } catch (e) {
        res.status(500).json({ message: `Error: ${e}` });
    }
}

module.exports = { addToHistory, getUserHistory };


