import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { Ticket } from "../../models/Ticket";
import { StatusCodes } from "http-status-codes";

const buildTicket = async () => {
  const ticket = Ticket.buildTicket({
    price: 100,
    title: "Concert",
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  return ticket;
};

it("retruns a list of orders", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();
  const userOne = global.signin();
  const userTwo = global.signin();
  await request(app)
    .post("/new")
    .set("Cookie", userOne)
    .send({
      ticketId: ticketOne.id,
    })
    .expect(StatusCodes.CREATED);
  const {
    body: {
      data: { savedOrder: orderOne },
    },
  } = await request(app)
    .post("/new")
    .set("Cookie", userTwo)
    .send({
      ticketId: ticketTwo.id,
    })
    .expect(StatusCodes.CREATED);
  const {
    body: {
      data: { savedOrder: orderTwo },
    },
  } = await request(app)
    .post("/new")
    .set("Cookie", userTwo)
    .send({
      ticketId: ticketThree.id,
    })
    .expect(StatusCodes.CREATED);
  const response = await request(app)
    .get("/orders")
    .set("Cookie", userTwo)
    .send({})
    .expect(StatusCodes.OK);

  expect(response.body.data.orders.length).toEqual(2);
  expect(response.body.data.orders[0].id).toEqual(orderOne.id);
  expect(response.body.data.orders[1].id).toEqual(orderTwo.id);
});
