const express = require('express');
const router = express.Router();
const {
    allFriends,
    addFriend,
    editFriend,
    updateFriend,
    deleteFriend,
} = require('../controllers/friends');

router.get('', allFriends);

router.post('/newfriend', addFriend);

router.get('/:id/edit', editFriend);

router.put('/:friendID', updateFriend);

router.delete('/:friendID', deleteFriend);

module.exports = router;
