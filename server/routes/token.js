var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');
var cfg = require('../config.js');
var users = require('../users.js');

/* POST tokens. */
router.post('/', function(req, res) {  
    if (req.body.email && req.body.password) {
        var email = req.body.email;
        var password = req.body.password;
        var user = users.find(function(u) {
            return u.email === email && u.password === password;
        });
        if (user) {
            var payload = {
                id: user.id
            };
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({
                token: token
            });
        } else {
            // res.sendStatus(401);
            res.status(401).send({
                status: 401,
                messageCode: 1001,
                message: 'cannot find user with the credentials provided'
            })
        }
    } else {
        // res.sendStatus(401);
        res.send(401).send({
            status: 401,
            messageCode: 1002,
            message: 'error, email and/or password was not received'
        })
    }
});

module.exports = router;