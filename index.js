import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import helmet from "helmet";
import logger from "./Utils/logger.js";
import { mongooseConnection } from "./Utils/mongoDB_configuration.js";

const app = express();
const port = process.env.PORT || 8080; 

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json({ limit: "500mb" }));
app.use(helmet());


app.get("/", (req, res) => {
    res.send("Work Hard Buddy   !!!!!");
   });


try {
  const db = await mongooseConnection();
  if (db) {
    console.log(`📅 database connected...`);
    app.listen(port, () => {
      console.log(`👍 server started successfully http://localhost:${port}`);
    });
  }
} catch (error) {
  console.log(error);
  console.timeEnd(
    `👎 database connection has some problem : ${JSON.stringify(error)}`
  );
}
