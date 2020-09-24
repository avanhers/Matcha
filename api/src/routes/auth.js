'use strict';

const express = require('express');
const router = express.Router();
const controller = require('../controller/AuthController');

router.get('/', controller.getUser);
router.post('/inscription', controller.inscription);
router.get('/confirmation/:infos', controller.confirmation);

module.exports = router;