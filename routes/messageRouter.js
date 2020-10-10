const {Router} = require('express');
const msgController = require('../controllers/messageController');
const { requireAuth, checkUser } = require('../middlewares/authMiddleware');

const router = Router();

router.get('/all', msgController.get_all);
router.get('/:id', requireAuth, msgController.get_details);
router.post('/new', requireAuth, msgController.msg_post);
router.put('/:id/reply', requireAuth, msgController.msg_reply);
router.put('/:id', requireAuth, msgController.msg_edit);
router.delete('/:id', requireAuth, msgController.msg_delete);



module.exports = router;