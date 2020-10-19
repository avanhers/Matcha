const jwt = require("jsonwebtoken");
const tokenManager = require("../lib/jwt");
const UserManager = require("../manager/UserManager");
const manager = new UserManager();

exports.addUser = async function (req, res, next) {
  const token = req.headers["x-token"];
  if (!token) {
    return res.sendStatus(401);
  }
  try {
    const { userId } = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = userId;
  } catch (err) {
    const refreshToken = req.headers["x-refresh-token"];

    const tokens = await tokenManager.refreshTokens(refreshToken);
    if (tokens.token && tokens.refreshToken) {
      res.set({
        "Access-Control-Expose-Headers": "x-token, x-refresh-token",
        "x-token": tokens.token,
        "x-refresh-token": tokens.refreshToken,
      });
    } else {
      return res.sendStatus(401);
    }
    req.userId = tokens.userId;
  }
  next();
};
