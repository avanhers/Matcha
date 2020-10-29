"user strict";

const db = require("../../framework/Database");

class NotificationManager {
  addNotification(emitter, type, receiver) {
    const sql = `INSERT INTO notifications (emitter, type, receiver) VALUES (?, ?, ?)`;
    const values = [emitter, type, receiver];

    return db.query(sql, values);
  }

  getNotification(username) {
    const sql = `SELECT emitter, type, notifiedAt, viewed FROM notifications 
      WHERE receiver = ?
      AND viewed = 0
      ORDER BY viewed ASC`;

    return db.query(sql, username);
  }

  readNotifications(username) {
    const sql = `UPDATE notifications
      SET viewed = 1
      WHERE receiver = ?`;

    return db.query(sql, username);
  }

  addMessage(fromId, toId, msg) {
    const sql = "INSERT into messages (fromId, toId, message) VALUES (?, ?, ?)";
    const values = [fromId, toId, msg];

    return db.query(sql, values);
  }
}

const notificationManager = new NotificationManager();

module.exports = notificationManager;
