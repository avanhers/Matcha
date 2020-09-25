'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/AuthController');

router.post('/inscription', controller.inscription);
router.get('/confirmation/:hash', controller.confirmation);
router.post('/login', controller.login);
router.post('/test', controller.test);

module.exports = router;