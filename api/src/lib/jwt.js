const jwt = require("jsonwebtoken");
const UserManager = require("../manager/UserManager");
const manager = new UserManager();

const tokenManager = {
  createTokens: function (user) {
    const accessToken = jwt.sign(
      {
        userId: user.getId(),
      },
      process.env.SECRET_KEY,
      {
        expiresIn: "1m",
      }
    );
    const refreshToken = jwt.sign(
      {
        userId: user.getId(),
      },
      process.env.REFRESH_SECRET + user.getPassword(),
      {
        expiresIn: "1d",
      }
    );
    return {
      accessToken: accessToken,
      newRefreshToken: refreshToken,
    };
  },

  refreshTokens: async function (refreshToken) {
    let id = false;
    try {
      const { userId } = jwt.decode(JSON.parse(refreshToken));
      id = userId;
    } catch (err) {
      return {};
    }

    if (!id) {
      return {};
    }

    const user = await manager.findOneById(id);

    if (!(user && user.getIsLogin())) {
      return {};
    }

    //inactivate token if change password
    const refreshSecret = process.env.REFRESH_SECRET + user.getPassword();

    try {
      jwt.verify(JSON.parse(refreshToken), refreshSecret);
    } catch (err) {
      return {};
    }

    const { accessToken, newRefreshToken } = this.createTokens(user);
    return {
      token: accessToken,
      refreshToken: newRefreshToken,
      userId: user.getId(),
    };
  },
};

module.exports = tokenManager;
