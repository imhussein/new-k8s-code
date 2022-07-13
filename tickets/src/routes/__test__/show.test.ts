import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("returns a 400 if the ticket is not found", async () => {
  await request(app)
    .get("/ticket/" + new mongoose.Types.ObjectId().toHexString())
    .set("Cookie", global.signin())
    .send({})
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns the ticket if the ticket is found", async () => {
  const response = await request(app)
    .post("/new")
    .set("Cookie", global.signin())
    .send({
      price: 20,
      title: "14fdsf",
    })
    .expect(StatusCodes.CREATED);

  const ticketResponse = await request(app)
    .get(`/ticket/${response.body.data.id}`)
    .set("Cookie", global.signin())
    .send({})
    .expect(StatusCodes.OK);

  expect(ticketResponse.body.data.title).toEqual("14fdsf");
  expect(ticketResponse.body.data.price).toEqual(20);
});
