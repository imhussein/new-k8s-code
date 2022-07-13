import { Ticket } from "../../models/Ticket";
import { natsWrapper } from "../../nats-wrapper";
import { TicketUpdatedListener } from "./ticket-update-listener";
import { Message } from "node-nats-streaming";
import mongoose from "mongoose";
import { Subjects } from "../subject";

interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    version: number;
    orderId: string;
    title: string;
    price: number;
    id: string;
    userId: string;
  };
}

const setup = async () => {
  const listener = new TicketUpdatedListener(natsWrapper.client);
  const ticket = Ticket.buildTicket({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();
  const data: TicketUpdatedEvent["data"] = {
    id: ticket.id,
    version: ticket.version + 1,
    title: "Updated",
    price: 21,
    userId: "dsadas",
  };
  // @ts-ignore
  const message: Message = {
    ack: jest.fn(),
  };
  return { listener, data, message, ticket };
};

it("finds, updates, and saves a ticket", async () => {
  const { message, data, listener, ticket } = await setup();
  await listener.onMessage(data, message);
  const updatedTicket = await Ticket.findById(ticket.id);
  expect(updatedTicket!.title).toEqual(data.title);
});
