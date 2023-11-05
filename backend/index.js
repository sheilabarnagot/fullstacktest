const express = require("express"),
  path = require("path");

const app = express();

const dotenv = require("dotenv"),
  { Client } = require("pg");

dotenv.config();

const client = new Client({
  connectionString: process.env.PGURI,
});

client.connect();

app.get("/api", async (_request, response) => {
  const motos = ["Harley", "Honda", "KAWA", "YAMAHA", "DUC"];

  const placeholders = motos.map((_, index) => `$${index + 1}`).join(", ");

  const query = `SELECT * FROM mc WHERE name IN (${placeholders})`;

  try {
    const { rows } = await client.query(query, motos);
    response.json(rows);
  } catch (error) {
    console.error("Error al obtener datos:", error);
    response.status(500).json({ error: "Error al obtener datos" });
  }
});

// app.get("/api", async (_request, response) => {
//   const { rows } = await client.query("SELECT * FROM mc WHERE name = $1", [
//     "Harley", "Honda", "KAWA", "YAMAHA", "DUC"
//   ]);

//   response.send(rows);
// });

// app.use(express.static(path.join(path.resolve(), "public")));

// app.listen(3000, () => {
//   console.log("Redo på http://localhost:3000/");
// });
