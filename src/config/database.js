const MONGODB_URL = process.env.MONGODB_URL || 'mongodb://modelum.es/db:27017';
const DB_NAME = process.env.DB_NAME || 'marketplace';

module.exports = { MONGODB_URL, DB_NAME };
