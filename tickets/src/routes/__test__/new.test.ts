import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../nats-wrapper";

it("has a route handler listening to /api/tickets for post request", async () => {
  const response = await request(app).post("/new").send({});
  expect(response.status).not.toEqual(StatusCodes.NOT_FOUND);
});

it("can only be accessed if the user is signed in", async () => {
  const response = await request(app).post("/new").send({});
  expect(response.status).toEqual(StatusCodes.UNAUTHORIZED);
});

it("can be accessed if the user is signed in", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({});

  expect(response.status).not.toEqual(StatusCodes.UNAUTHORIZED);
});

it("returns an error if invalid title is provided", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "", price: 100 });

  expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
});

it("returns an error if invalid price is provided", async () => {
  const cookie = global.signin();

  const response = await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed" });

  expect(response.status).toEqual(StatusCodes.BAD_REQUEST);
});

it("creates a ticket with valid input", async () => {
  const cookie = global.signin();

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  const response = await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 });

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(1);

  expect(response.status).toEqual(StatusCodes.CREATED);
});

it("publishes an event", async () => {
  const cookie = global.signin();
  await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 })
    .expect(StatusCodes.CREATED);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
