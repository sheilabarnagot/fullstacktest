const express = require("express");
const path = require("path");
const cors = require("cors");
const { Client } = require("pg");

const app = express();

app.use(cors());

const dotenv = require("dotenv");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get("/api", async (_request, response) => {
  const { rows } = await client.query("SELECT * FROM mc");

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "public")));

app.use(express.json());

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
