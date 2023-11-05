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
  const { rows } = await client.query("SELECT * FROM mc WHERE name = $1", [
    "Harley",
  ]);

  response.send(rows);
});

app.use(express.static(path.join(path.resolve(), "public")));
app.use(express.json());
app.listen(3000, () => {
  console.log("Redo på http://localhost:3000/");
});

// [20:07] Tatiana Lopes da luz - JSU22 GBG
// const dotenv = require("dotenv"),
//   { Client } = require("pg");

// const express = require("express"),
//   path = require("path");
// dotenv.config();
// const cors = require("cors");
// const app = express();

// app.use(express.json());
// app.use(cors());

// const client = new Client({
//   connectionString: process.env.PGURI,
// });

// client.connect();

// app.get("/api", async (_request, response) => {
//   const { rows } = await client.query("SELECT * FROM superheroes");

//   response.send(rows);
// });

// app.post("/api", async (request, response) => {
//   try {
//     let name = request.body.name;
//     let power = request.body.power;

//     await client.query(
//       "INSERT INTO superheroes (name, power) VALUES ($1, $2)",
//       [name, power]
//     );

//     const { rows } = await client.query("SELECT * FROM superheroes");
//     response.status(201).send(rows);
//   } catch (error) {
//     console.error(error);
//     response.status(500).send("FAIL");
//   }
// });

// app.delete("/api", async (request, response) => {
//   try {
//     const ids = request.body.ids;

//     const query = `DELETE FROM superheroes WHERE id = ANY($1::int[])`;
//     await client.query(query, [ids]);

//     const { rows } = await client.query("SELECT * FROM superheroes");
//     response.status(200).send(rows);
//   } catch (error) {
//     console.error(error);
//     response.status(500).send("FAIL");
//   }
// });

// app.use(express.static(path.join(path.resolve(), "public")));

// app.listen(3000, () => {
//   console.log("Redo på http://localhost:3000/");
// });
