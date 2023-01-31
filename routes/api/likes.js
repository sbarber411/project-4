import express from 'express';
const router = express.Router();
import likesCtrl from '../../controllers/likes.js'

router.post('/trips/:id/likes', likesCtrl.create)
router.delete('/likes/:id', likesCtrl.deleteLike)

module.exports = router;