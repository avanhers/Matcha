'use strict';

const express = require('express');

const router = express.Router();

router.post('/', (req, res, next) => {
    res.send(req.body);
})

module.exports = router;