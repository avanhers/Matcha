"user strict";
const UserManager = require("../manager/UserManager");
const manager = new UserManager();

class MatchController {
  async getUsers(req, res) {
    const user = await manager.findOneById(req.userId);

    if (user) {
      await manager.addMatchesToUser(user);
      return res.json({ status: 200, users: user.getMatches() });
    }
    return res.json({ status: 400, msg: "bad user" });
  }

  async getMessages(req, res) {
    const user = await manager.findOneById(req.userId);
    const { username } = req.params;

    if (user && username) {
      const receiver = await manager.findUserByUsername(username);
      const messages = await manager.getConversationWith(
        user.getId(),
        receiver.getId()
      );

      await manager.updateViewedMessage(user.getId(), receiver.getId());
      return res.json({ status: 200, messages: messages });
    }
    return res.json({ status: 400, msg: "bad request" });
  }
}

const controller = new MatchController();

module.exports = controller;
