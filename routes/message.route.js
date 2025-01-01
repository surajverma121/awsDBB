import express from 'express'
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { collegeaa, collges, deleteCollege, getMessage, sendMessage, updateCollege } from '../controllers/message.controller.js';

const router=express.Router();

router.route('/send/:id').post(isAuthenticated,sendMessage);
router.route('all/:id').get(isAuthenticated,getMessage);


router.route('/api/college').post( collegeaa);

router.route('/api/colleges').get( collges);
router.route('/api/colleges/update/:id').put(updateCollege);
router.route('/api/colleges/delete/:id').delete(deleteCollege);





export default router