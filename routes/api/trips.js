import express from 'express';
const router = express.Router();
import tripsCtrl from '../../controllers/trips.js';
import multer from 'multer'
const upload = multer()
// /*---------- Public Routes ----------*/
router.post('/',  upload.single('photo'), tripsCtrl.create);
router.get('/', tripsCtrl.index)
router.delete('/:id', tripsCtrl.deleteLog)


/*---------- Protected Routes ----------*/
module.exports = router;