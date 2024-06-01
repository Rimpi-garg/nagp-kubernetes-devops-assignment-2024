const keys = require("./keys");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Postgres Client Setup
const { Pool } = require("pg");
const pgClient = new Pool({
  user: keys.pgUser,
  host: keys.pgHost,
  database: keys.pgDatabase,
  password: keys.pgPassword,
  port: keys.pgPort,
});

pgClient.on("connect", (client) => {
  client
    .query("CREATE TABLE IF NOT EXISTS users (username VARCHAR(255))")
    .catch((err) => console.error(err));
});

app.get("/", (req, res) => {
  res.send("Hello from the server!");
});

app.get("/users", async (req, res) => {
  const values = await pgClient.query("SELECT * from users");

  res.send(values.rows);
});


app.post("/users", async (req, res) => {
  const username = req.body.username;

  if (!username) {
    return res.status(400).send("Username is required");
  }

  try {
    await pgClient.query("INSERT INTO users(username) VALUES($1)", [username]);
    res.send({ success: true });
  } catch (err) {
    res.status(500).send("Error inserting username into database");
  }
});

app.listen(5000, (err) => {
  console.log("Listening");
});
