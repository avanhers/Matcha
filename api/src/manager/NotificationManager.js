"user strict";

const db = require("../../framework/Database");

class NotificationManager {
  addNotification(emitter, type, receiver) {
    const sql = `INSERT INTO notifications (emitter, type, receiver) VALUES (?, ?, ?)`;
    const values = [emitter, type, receiver];

    return db.query(sql, values);
  }

  getNotification(username) {
    const sql = `SELECT emitter, type, notifiedAt FROM notifications 
      WHERE receiver = ?
      ORDER BY viewed ASC`;

    return db.query(sql, username);
  }
}

const notificationManager = new NotificationManager();

module.exports = notificationManager;
