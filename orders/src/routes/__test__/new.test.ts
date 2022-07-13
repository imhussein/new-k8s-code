import request from "supertest";
import mongoose from "mongoose";
import { app } from "../../app";
import { StatusCodes } from "http-status-codes";
import { Ticket } from "../../models/Ticket";
import { Order } from "../../models/Order";
import { OrderStatus } from "../../events/order-status";
import { natsWrapper } from "../../nats-wrapper";

it("returns an error id the ticket doesn't exists", async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/new")
    .set("Cookie", global.signin())
    .send({
      ticketId,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns an error id the ticket is reserved", async () => {
  const session = global.signin();
  const ticket = Ticket.buildTicket({
    title: "concert",
    price: 20,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  const order = Order.buildOrder({
    ticket,
    userId: "dasdasdasdasd",
    status: OrderStatus.Created,
    expiresAt: new Date(),
  });
  await order.save();
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/new")
    .set("Cookie", session)
    .send({
      ticketId,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("reserves a ticket", async () => {
  const session = global.signin();
  const ticket = Ticket.buildTicket({
    title: "my concert",
    price: 2210,
    id: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  await request(app)
    .post("/new")
    .set("Cookie", session)
    .send({
      ticketId: ticket.id,
    })
    .expect(StatusCodes.CREATED);
});

it("emits an order created event", async () => {
  const ticketId = mongoose.Types.ObjectId();
  await request(app)
    .post("/new")
    .set("Cookie", global.signin())
    .send({
      ticketId,
    })
    .expect(StatusCodes.BAD_REQUEST);
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
