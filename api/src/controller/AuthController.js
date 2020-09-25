'use strict';
const UserManager = require('../manager/UserManager');
const User = require('../entities/User');
const database = require('../../framework/Database');
const { v1: uuidv1 } = require('uuid');
const mailer = require('../../Mailer');
const { hash } = require('bcryptjs');
const manager = new UserManager();
const jwt = require('jsonwebtoken');

const ID = 0;
const HASH = 1;

const VALIDATION = 1;

const authController = {

    inscription: async function (request, response, next) {
        const user = new User(request.body);

        if (user.isWritable()) {
            const emailExist = await manager.findUserByEmail(user.getEmail());
            const usernameExist = await manager.findUserByUsername(user.getUsername());

            if (emailExist) {
                response.status(401).json({ status: 401, error: 'email already used' });
            } else if (usernameExist) {
                response.status(402).json({ status: 402, error: 'username already used' });
            } else {

                database.db.beginTransaction(async (beginTransactionError) => {
                    if (beginTransactionError) {
                        return response.status(400).json({ error: beginTransactionError.message });
                    }
                    try {
                        const hash = uuidv1();
                        const result = await manager.createUser(user);

                        user.setId(result.insertId);
                        user.setHashValidation(hash);
                        await manager.createHashValidation(user);
                        mailer.sendMail(user, 'confirmation').then((result) => {
                            database.db.commit(() => { response.status(200).json({ status: 201, msg: result }) });
                        }).catch((e) => {
                            database.db.rollback(() => response.status(403).json({ status: 403, error: e.message }));
                        })
                    } catch (e) {
                        database.db.rollback(() => response.status(400).json({ error: 'SQL ERRROR: ' + e.message }));
                    }
                });
            }
        } else {
            response.status(400).json({ status: 400, error: 'value missing' });
        }
    },

    confirmation: async function (request, response, next) {
        const { hash } = request.params;
        let result = await manager.readHashValidation(hash);

        result = result[0];
        if (result) {
            const hashId = result.id;

            await manager.deleteHash(hashId);
            response.status(200).json({ status: 204, msg: 'hash ' + hashId + ' deleted successfully' });
        } else {
            response.status(401).json({ status: 401, error: 'No confirmation needed' });
        }
    },

    login: async function (request, response, next) {
        const { username, password } = request.body;

        if (username && password) {
            const user = await manager.findUserByUsername(username);

            if (user && user.confirmPassword(password)) {
                const hashCode = await manager.hasHash(user.id);

                if (hashCode) {
                    return response.status(401).json(hashCode === VALIDATION ?
                        { status: 401, msg: 'Validation needed' }
                        : { status: 402, msg: 'Reset needed' });
                }
                //start authentification
                return response.json({ error: 'password correct ' })
            }
            return response.json({ error: 'password incorrect ' })
        }
        response.json({ ok: 'error' });
    },

    test: async function (request, response, next) {
        const { username } = request.body;
        const user = await manager.findUserByUsername(username);

        console.log(Object.keys(user));
        const assessToken = jwt.sign(user.toPlainObject(), process.env.SECRET_KEY, { expiresIn: '30s' });
        response.json({ yo: 'heyyyy', token: assessToken });
    }

}

module.exports = authController;