'use strict';

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    res.send("<h1>Service d'authentification>/h1?");
})

router.post('/', (req, res, next) => {
    res.send(req.body);
})

module.exports = router;