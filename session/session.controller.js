const express = require('express');
const router = express.Router();
const sessionService = require('./session.service');

// routes
router.post('/logout', recordSession);
router.get('/', getAll);

module.exports = router;


function recordSession(req, res, next) {
    sessionService.createSession(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function getAll(req, res, next) {
    sessionService.getAll(req)
        .then(sessions => sessions ? res.json(sessions) : res.sendStatus(401))
        .catch(err => next(err));
}