const { MongoClient } = require('mongodb');
const { MONGODB_URL, DB_NAME } = require('../config/database');

class DatabaseConnection {
  constructor(url = MONGODB_URL, dbName = DB_NAME) {
    this.url = url;
    this.dbName = dbName;
    this.client = null;
    this.db = null;
  }

  async connect() {
    this.client = new MongoClient(this.url);
    await this.client.connect();
    this.db = this.client.db(this.dbName);
    return this.db;
  }

  getDb() {
    if (!this.db) {
      throw new Error('Database not connected. Call connect() first.');
    }
    return this.db;
  }

  async close() {
    if (this.client) {
      await this.client.close();
      this.client = null;
      this.db = null;
    }
  }
}

module.exports = DatabaseConnection;
