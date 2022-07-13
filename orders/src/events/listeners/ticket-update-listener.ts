import { Message } from "node-nats-streaming";
import { BadRequestError } from "../../errors/bad-request-error";
import { Ticket } from "../../models/Ticket";
import { Listener } from "../base-listener";
import { Subjects } from "../subject";
import { queueGroupName } from "./queue-group-name";

interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    orderId: string;
    version: number;
    title: string;
    price: number;
    id: string;
    userId: string;
  };
}

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    {
      title,
      price,
      id,
      version,
    }: {
      title: string;
      price: number;
      id: string;
      userId: string;
      version: number;
    },
    message: Message
  ): Promise<void> {
    const ticket = await Ticket.findByEvent({ id, version });
    if (!ticket) {
      throw new BadRequestError("ticket not found");
    }
    ticket.set({
      title,
      price,
    });
    await ticket.save();
    message.ack();
  }
}
