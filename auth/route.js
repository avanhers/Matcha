'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("<h1>Service d'authentification</h1>");
})

router.post('/inscription', controller.inscription);

module.exports = router;