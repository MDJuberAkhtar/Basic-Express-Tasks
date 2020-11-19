const express = require('express');
const router = express.Router();
const controlPlayer = require('./controllPlayer');

router.route('/index').get(controlPlayer.getplayer).post(controlPlayer.postPlayer)

module.exports = router;