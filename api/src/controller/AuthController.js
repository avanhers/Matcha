'use strict';
const UserManager = require('../manager/UserManager');
const User = require('../entities/User');
const manager = new UserManager();

const authController = {

    getUser: function (request, response, next) {
        manager.findAll((err, result) => {
            if (!err) {
                response.status(200).json(result);
            } else {
                response.status(404).json({
                    error: err.message,
                })
            }
        })
    },

    inscription: (request, response, next) => {
        const user = new User(request.body);

        response.status(200).json(user);
    }

}

module.exports = authController;