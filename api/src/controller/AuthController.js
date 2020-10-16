"use strict";
const UserManager = require("../manager/UserManager");
const User = require("../entities/User");
const database = require("../../framework/Database");
const { v1: uuidv1 } = require("uuid");
const mailer = require("../../Mailer");
const manager = new UserManager();
const tokenManager = require("../lib/jwt");

const VALIDATION = 1;
const FORGET = 2;

const authController = {
  inscription: async function (request, response, next) {
    const user = new User(request.body);

    if (user.isWritable()) {
      const emailExist = await manager.findUserByEmail(user.getEmail());
      const usernameExist = await manager.findUserByUsername(
        user.getUsername()
      );

      if (emailExist) {
        response.status(200).json({ status: 401, error: "email already used" });
      } else if (usernameExist) {
        response
          .status(200)
          .json({ status: 402, error: "username already used" });
      } else {
        database.db.beginTransaction(async (beginTransactionError) => {
          if (beginTransactionError) {
            return response
              .status(200)
              .json({ error: beginTransactionError.message });
          }
          try {
            const hash = uuidv1();
            const result = await manager.createUser(user);

            user.setId(result.insertId);
            await manager.createHashValidation(user, hash);
            mailer
              .sendMail(user, "confirmation", hash)
              .then((result) => {
                database.db.commit(() => {
                  response.status(200).json({ status: 201, msg: result });
                });
              })
              .catch((e) => {
                database.db.rollback(() =>
                  response.status(200).json({ status: 403, error: e.message })
                );
              });
          } catch (e) {
            database.db.rollback(() =>
              response.status(200).json({ error: "SQL ERRROR: " + e.message })
            );
          }
        });
      }
    } else {
      response.status(200).json({ status: 400, error: "bad values" });
    }
  },

  confirmation: async function (request, response, next) {
    const { hash } = request.params;
    let result = await manager.readHashValidation(hash);

    result = result[0];
    if (result) {
      const hashId = result.id;

      await manager.deleteHash(hashId);
      response
        .status(200)
        .json({ status: 204, msg: "hash " + hashId + " deleted successfully" });
    } else {
      response
        .status(200)
        .json({ status: 401, error: "No confirmation needed" });
    }
  },

  login: async function (request, response, next) {
    const { username, password } = request.body;

    if (username && password) {
      const user = await manager.findUserByUsername(username);
      console.log(user);

      if (user && user.confirmPassword(password)) {
        const hashCode = await manager.hasHash(user.id);

        if (hashCode) {
          return response
            .status(200)
            .json(
              hashCode === VALIDATION
                ? { status: 401, msg: "Validation needed" }
                : { status: 402, msg: "Reset needed" }
            );
        }
        const tokens = tokenManager.createTokens(user);
        await manager.login(user);
        response.set({
          "Access-Control-Expose-Headers": "x-token, x-refresh-token",
          "x-token": tokens.accessToken,
          "x-refresh-token": tokens.newRefreshToken,
        });
        console.log(user.isComplete());
        return response
          .status(200)
          .json({ status: 200, complete: user.isComplete() });
      }
      return response.json({
        status: 403,
        msg: "login or password incorrect",
      });
    }
    response.status(200).json({ status: 400, msg: "incomplete fields" });
  },

  canLog: async function (req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      if (user.getIsLogin()) {
        return res.json({ status: 400, msg: "already logged" });
      }
      return res.json({ status: 200, msg: "can connect" });
    }
    return res.json({ status: 401, msg: "bad user" });
  },

  logout: async function (request, response, next) {
    if (request.userId) {
      manager.logout(request.userId);
      return response.status(200).json({ msg: "user disconected" });
    }
    return response.status(200).json({ status: 400, msg: "userId needed" });
  },

  hashExist: async function (req, res) {
    const { hash } = req.params;

    const userId = await manager.getUserIdByHashForget(hash);
    if (userId) {
      await manager.deleteHashByUserId(userId);
      return res.json({ status: 200, id: userId });
    }
    res.json({ status: 400, msg: "hash does not exists" });
  },

  resetPassword: async function (request, response, next) {
    const { password, userId } = request.body;

    if (password && userId) {
      try {
        const user = await manager.findOneById(userId);

        if (!user.isPassword(password)) {
          return response.json({ status: 400, error: "bad password" });
        }
        user.setHashPassword(password);
        await manager.updatePassword(user);
        return response
          .status(201)
          .json({ status: 201, msg: "password reset" });
      } catch (err) {
        return response.status(200).json({ status: 401, msg: err.message });
      }
    }
    return response
      .status(200)
      .json({ status: 400, msg: "parameters are needed" });
  },

  forgetPassword: async function (request, response, next) {
    const { email } = request.body;

    if (email) {
      const user = await manager.findUserByEmail(email);
      if (user) {
        const hash = uuidv1();

        if (await manager.hasHash(user.getId())) {
          await manager.updateHashForget(user, hash);
        } else {
          await manager.createHashForget(user, hash);
        }
        mailer
          .sendMail(user, "reset", hash)
          .then((result) =>
            response.status(200).json({ status: 201, msg: result })
          )
          .catch((e) =>
            response.status(200).json({ status: 402, error: e.message })
          );
      } else {
        return response.status(200).json({ status: 401, msg: "user unexist" });
      }
    } else {
      response.status(200).json({ status: 402, msg: "email needed" });
    }
  },

  test: async function (request, response, next) {
    const { username } = request.body;
    const user = await manager.findUserByUsername(username);
    const tokens = tokenManager.createTokens(user);

    response.json(tokens);
  },
};

module.exports = authController;
