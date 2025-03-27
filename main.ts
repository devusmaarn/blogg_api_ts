import "reflect-metadata";

import express from "express";
import { v1Router } from "./src";

const app = express();
const port = process.env.PORT;

//middlewares
app.use(express.json());
app.use(express.urlencoded());

//Check Health
app.get("/health", (req, res) => {
  res.send({ message: "App running" });
});

app.use("/v1", v1Router);

app.listen(port, (err) => {
  if (err) console.log(err);
  else console.log(`App running on http://localhost:${port}`);
});
