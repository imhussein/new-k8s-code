import jwt from "jsonwebtoken";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

declare global {
  var signin: () => string[];
}

let mongo: MongoMemoryServer;
let conn: typeof import("mongoose");

jest.mock("../nats-wrapper");

beforeAll(async () => {
  process.env.JWT_SECRET = "d24dcas%$#";
  process.env.NODE_ENV = "test";
  process.env.JWT_EXPIRES_IN = "2d";
  mongo = await MongoMemoryServer.create();
  const mongoUri = await mongo.getUri();
  conn = await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    dbName: "verifyMASTER",
    useUnifiedTopology: true,
  });
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await conn.connection.close();
});

let email = "moahmed@gmai.com";
let password = "123456";

global.signin = () => {
  const payload = {
    id: new mongoose.Types.ObjectId().toHexString(),
    email: "mnohasd@gmail.com",
    avatar: "a21falsdhfa",
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET as string, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  const sessionJSON = JSON.stringify({ token });
  const base64 = Buffer.from(sessionJSON).toString("base64");
  const cookie = [`session=${base64}; path=/; httponly`];
  return cookie;
};
