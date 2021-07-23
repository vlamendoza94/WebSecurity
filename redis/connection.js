const Redis = require("ioredis");
const config = require("../config/config").redis;

const redis = new Redis(config);

module.exports = redis;
