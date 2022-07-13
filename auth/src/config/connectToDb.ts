import mongoose from "mongoose";
import { MONGO_DB, MONGO_HOST, MONGO_PORT } from "./keys";

export const connectToDb = async (): Promise<mongoose.Connection> => {
  const conn = await mongoose.connect(
    `mongodb://${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  );
  return conn.connection;
};
