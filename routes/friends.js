const express = require('express');
const router = express.Router();
const {
    allFriends,
    addFriend,
    editFriend,
    updateFriend,
    deleteFriend,
} = require('../controllers/friends');

// Get all friends
router.get('', allFriends);

// Add new friends
router.post('/newfriend', addFriend);

// Get specific friend
router.get('/:id/edit', editFriend);

// Update specific friend
router.put('/:friendID', updateFriend);

// Delete a friend
router.delete('/:friendID', deleteFriend);

module.exports = router;
