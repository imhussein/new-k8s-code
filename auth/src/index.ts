import { app } from "./app";
import { connectToDb } from "./config/connectToDb";
import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  MONGO_DB,
  MONGO_HOST,
  MONGO_PORT,
  PORT,
} from "./config/keys";
import { logRoutes } from "./middlewares/logRoutes";
import "colors";
const port = PORT;

const main = async () => {
  if (MONGO_HOST === undefined) {
    console.log(`MONGO_HOST environment variable is required`);
  }
  if (MONGO_PORT === undefined) {
    console.log(`MONGO_PORT environment variable is required`);
  }
  if (MONGO_DB === undefined) {
    console.log(`MONGO_DB environment variable is required`);
  }
  if (PORT === undefined) {
    console.log(`PORT environment variable is required`);
  }
  if (JWT_SECRET === undefined) {
    console.log(`JWT_SECRET environment variable is required`);
  }
  if (JWT_EXPIRES_IN === undefined) {
    console.log(`JWT_EXPIRES_IN environment variable is required`);
  }
  logRoutes();
  const conn = await connectToDb();
  app.listen(port, () => {
    console.log(`Server started at port ${port}`.yellow);
  });
  console.log(`MongoDb Connected at ${conn.host}`);
};

main().catch((err) => {
  console.log(err.message || err);
});
