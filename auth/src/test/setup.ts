import request from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import { app } from "../app";
import { StatusCodes } from "http-status-codes";

declare global {
  var signin: () => Promise<string[]>;
}

let mongo: MongoMemoryServer;
let conn: typeof import("mongoose");

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

global.signin = async () => {
  const response = await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.CREATED);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
