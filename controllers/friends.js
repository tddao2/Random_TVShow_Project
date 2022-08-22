const axios = require('axios');

module.exports.allFriends = async (req, res) => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/friends/all');
        var friends = response.data;
        res.render('pages/index', { friends });
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/');
    }
};

module.exports.addFriend = async (req, res) => {
    const { firstname, lastname } = req.body;
    try {
        const friend = await axios.post(
            'http://127.0.0.1:5000/friend/addfriend',
            {
                firstname,
                lastname,
            }
        );
        req.flash('success', friend.data);
        res.redirect('/movie');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/');
    }
};

module.exports.editFriend = async (req, res) => {
    const { id } = req.params;
    try {
        const response = await axios.get(
            `http://127.0.0.1:5000/friends?friendID=${id}`
        );

        const friend = response.data;

        res.render('pages/editFriend', { friend });
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/');
    }
};

module.exports.updateFriend = async (req, res) => {
    const { friendID } = req.params;
    const { firstname, lastname } = req.body;

    try {
        const friend = await axios.put(`http://127.0.0.1:5000/friends`, {
            friendID,
            firstname,
            lastname,
        });
        req.flash('success', friend.data);
        res.redirect('/friend');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/');
    }
};

module.exports.deleteFriend = async (req, res) => {
    const { friendID } = req.params;
    try {
        const friend = await axios.delete(
            `http://127.0.0.1:5000/friends?friendID=${friendID}`
        );
        req.flash('success', friend.data);
        res.redirect('/friend');
    } catch (error) {
        req.flash('error', error.response.statusText);
        res.redirect('/');
    }
};
