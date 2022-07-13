import {
  JWT_EXPIRES_IN,
  JWT_SECRET,
  MONGO_DB,
  MONGO_HOST,
  MONGO_PORT,
  NATS_CLIENT_ID,
  NATS_CLUSTER_ID,
  NATS_HOST,
  NATS_PORT,
  PORT,
  REDIS_HOST,
  REDIS_PORT,
} from "./config/keys";
import { logRoutes } from "./middlewares/logRoutes";
import "colors";
import { natsWrapper } from "./nats-wrapper";
import { OrderCreatedListener } from "./events/order-created-listener";

const main = async () => {
  if (REDIS_HOST === undefined) {
    console.log(`REDIS_HOST environment variable is required`);
  }
  if (REDIS_PORT === undefined) {
    console.log(`REDIS_PORT environment variable is required`);
  }
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
  if (NATS_CLUSTER_ID === undefined) {
    console.log(`NATS_CLUSTER_ID environment is required`);
  }
  if (NATS_CLIENT_ID === undefined) {
    console.log(`NATS_CLIENT_ID environment is required`);
  }
  if (NATS_HOST === undefined) {
    console.log(`NATS_HOST environment is required`);
  }
  if (NATS_PORT === undefined) {
    console.log(`NATS_PORT environment is required`);
  }
  logRoutes();

  natsWrapper.connect(
    process.env.NATS_CLUSTER_ID as string,
    process.env.NATS_CLIENT_ID as string,
    `http://${process.env.NATS_HOST}:${process.env.NATS_PORT}`
  );
  natsWrapper.client.on("close", () => {
    console.log("Nats Closing");
    process.exit();
  });
  process.on("SIGINT", () => {
    natsWrapper.client.close();
  });
  process.on("SIGTERM", () => {
    natsWrapper.client.close();
  });
  new OrderCreatedListener(natsWrapper.client).listen();
  console.log("Expiration Service Started");
};

main().catch((err) => {
  console.log(err.message || err);
});
