import { TicketCreatedListener } from "./ticket-created-listener";
import { natsWrapper } from "../../nats-wrapper";
import mongoose from "mongoose";
import { Subjects } from "../subject";
import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    version: number;
    userId: string;
    price: number;
    title: string;
    id: string;
  };
}

const setup = async () => {
  const listener = new TicketCreatedListener(natsWrapper.client);

  const data: TicketCreatedEvent["data"] = {
    version: 0,
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "Mohamed",
    userId: new mongoose.Types.ObjectId().toHexString(),
    price: 111,
  };

  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };
  return {
    listener,
    data,
    message,
  };
};

it("creates and save a ticket", async () => {
  const { listener, data, message } = await setup();
  await listener.onMessage(data, message);

  const ticket = await Ticket.findById(data.id);

  expect(ticket).toBeDefined();
});

it("ack the message", async () => {
  const { message, data, listener } = await setup();

  await listener.onMessage(data, message);

  expect(message.ack).toHaveBeenCalled();
});
