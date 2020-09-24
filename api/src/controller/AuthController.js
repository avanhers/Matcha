'use strict';
const UserManager = require('../manager/UserManager');
const User = require('../entities/User');
const manager = new UserManager();
const ID = 0;
const HASH = 1;

const authController = {

    inscription: async function (request, response, next) {
        const user = new User(request.body);

        if (user.isWritable()) {
            const emailExist = await manager.findUserByEmail(user.getEmail());
            const usernameExist = await manager.findUserByUsername(user.getUsername());

            if (emailExist[0]) {
                response.status(401).json({ status: 401, error: 'email already used' });
            } else if (usernameExist[0]) {
                response.status(402).json({ status: 402, error: 'username already used' });
            } else {
                manager.userRegistration(user).then((result) => {
                    response.status(201).json({ status: 201, msg: result })
                }).catch((error) => {
                    response.status(403).json({ status: 403, error: error })
                })
            }
        } else {
            response.status(400).json({ status: 400, error: 'value missing' });
        }
    },

    confirmation: async function (request, response, next) {
        const params = request.params.infos.split('.');
        const user = {
            id: params[ID],
            hash: params[HASH],
        }
        let result = await manager.readHashValidation(user.id);

        if (result = result[0]) {
            const hashId = result.id;

            await manager.deleteHash(hashId);
            response.status(200).json({ status: 204, msg: 'hash ' + hashId + ' deleted successfully' });
        } else {
            console.log('non');
            response.status(401).json({ status: 401, error: 'No confirmation needed' });
        }
    }

}

module.exports = authController;