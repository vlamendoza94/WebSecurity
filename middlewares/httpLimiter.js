const rateLimiter = require("express-rate-limit");
const RedisStore = require("rate-limit-redis");

const redisConnection = require("../redis/connection");

const redisStore = new RedisStore({
  client: redisConnection,
});

const options = {
  store: redisStore,
  windowMs: 1 * 60 * 1000, //1000 peticiones por minuto como maximo
  max: 1000, //Maximo de peticiones por minuto
  delayMs: 0, //Delay de petcion desabilitada hasta que exceda el maximo
};

module.exports = rateLimiter(options);
