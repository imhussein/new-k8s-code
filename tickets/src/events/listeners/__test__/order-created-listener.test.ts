import { natsWrapper } from "../../../nats-wrapper";
import {
  OrderCreatedEvent,
  OrderCreatedListener,
  OrderStatus,
} from "../order-created-listener";
import mongoose from "mongoose";
import { Ticket } from "../../../models/Ticket";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);
  const ticket = Ticket.buildTicket({
    title: "covert",
    price: 99,
    userId: new mongoose.Types.ObjectId().toHexString(),
  });
  await ticket.save();
  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    status: OrderStatus.Created,
    userId: new mongoose.Types.ObjectId().toHexString(),
    expiresAt: new Date().toISOString(),
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };
  return {
    listener,
    message,
    data,
    ticket,
  };
};

it("sets the userId of the ticket", async () => {
  const { listener, message, data, ticket } = await setup();

  await listener.onMessage(data, message);

  const updatedTicket = await Ticket.findById(ticket.id);

  expect(updatedTicket!.orderId).toEqual(data.ticket.id);
});
