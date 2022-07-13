import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";

it("returns a 400 if the provided doesn't exists", async () => {
  await request(app)
    .put("/ticket/" + new mongoose.Types.ObjectId().toHexString())
    .set("Cookie", global.signin())
    .send({ title: "Concert", price: 10 })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 400 if the provided doesn't exists", async () => {
  await request(app)
    .put("/ticket/" + new mongoose.Types.ObjectId().toHexString())
    .set("Cookie", global.signin())
    .send({ title: "Concert", price: 10 })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 401 if not authenticated", async () => {
  await request(app)
    .put("/ticket/" + new mongoose.Types.ObjectId().toHexString())
    .send({ title: "Concert", price: 10 })
    .expect(StatusCodes.UNAUTHORIZED);
});

it("updates a ticket", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 });

  const updateRes = await request(app)
    .put("/ticket/" + response.body.data.id)
    .set("Cookie", cookie)
    .send({ title: "Updated Ticket", price: 102 });

  expect(updateRes.body.data.title).toEqual("Updated Ticket");
  expect(updateRes.body.data.price).toEqual(102);
});

it("permission check", async () => {
  const response = await request(app)
    .post("/new")
    .set("Cookie", global.signin())
    .send({ title: "Mohamed", price: 100 });

  await request(app)
    .put("/ticket/" + response.body.data.id)
    .set("Cookie", global.signin())
    .send({ title: "Updated Ticket", price: 102 })
    .expect(StatusCodes.BAD_REQUEST);
});
