'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/AuthController');

router.get('/test', controller.getUser);
router.post('/inscription', controller.inscription);

module.exports = router;