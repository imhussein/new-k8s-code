import { Message } from "node-nats-streaming";
import { Ticket } from "../../models/Ticket";
import { Listener } from "../base-listener";
import { Subjects } from "../subject";
import { queueGroupName } from "./queue-group-name";

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

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    {
      title,
      price,
      id,
      version,
    }: {
      userId: string;
      price: number;
      title: string;
      id: string;
      version: number;
    },
    message: Message
  ): Promise<void> {
    const ticket = Ticket.buildTicket({
      title,
      price,
      id,
    });
    await ticket.save();
    message.ack();
  }
}
