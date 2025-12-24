const {addToHistory,getUserHistory} =require('../controllers/meeting.controller');
const express=require ('express');
const router=express.Router();
router.post('/add_to_activity',addToHistory);
router.get('/get_all_activities',getUserHistory);
// router.post('/create', createMeeting);
// router.get('/check/:code', checkMeeting);

module.exports=router;
