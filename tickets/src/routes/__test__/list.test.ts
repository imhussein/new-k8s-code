import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";

it("can fetch a list of tickets", async () => {
  const cookie = global.signin();

  let tickets = await Ticket.find({});

  expect(tickets.length).toEqual(0);

  await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 });

  await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 });

  await request(app)
    .post("/new")
    .set("Cookie", cookie)
    .send({ title: "Mohamed", price: 100 });

  tickets = await Ticket.find({});

  expect(tickets.length).toEqual(3);
});
