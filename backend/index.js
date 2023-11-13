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

app.post("/api/new", async (request, response) => {
  const newData = request.body;
  response.send("New item created!");
});

app.put("/api/update/:id", async (request, response) => {
  const { id } = request.params;
  const updatedData = request.body;
  response.send(`Item with ID ${id} it's up to date`);
});

app.delete("/api/delete/:id", async (request, response) => {
  const { id } = request.params;
  response.send(`Item with ID ${id} deleted`);
});

app.use(express.static(path.join(path.resolve(), "public")));

app.use(express.json());

app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});
