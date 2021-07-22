require("dotenv").config();
const express = require("express");
const hbs = require("hbs");
const path = require("path");
const helmet = require("helmet");

const { logger, requestLogger, errorLogger } = require("./utils/logger");

const app = express();

const SERVER_PORT = process.env.SERVER_PORT || 3000;

const VIEW_DIR = path.join(__dirname, "views");
const VIEW_PARTIALS = path.join(__dirname, "views/partials");

hbs.registerPartials(VIEW_PARTIALS);

app.use(helmet());

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "code.jquery.com", "maxcdn.bootstrapcdn.com"],
        styleSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
        fontSrc: ["'self'", "maxcdn.bootstrapcdn.com"],
      },
    },
  })
);

app.use(requestLogger);

app.use(express.json({ limit: "100kb", parameterLimit: "1000" }));

app.set("views", VIEW_DIR);
app.set("view engine", "hbs");
  
app.get("/", (req, res) => {
  res.render("home", { title: "Home page" });
});

app.use(errorLogger);

app.listen(SERVER_PORT, () => {
  logger.info(`Servidor Iniciado en puerto ${SERVER_PORT}`);
});

process.on("error", (err) => {
  console.error("Erro capturaDO", err);
});
