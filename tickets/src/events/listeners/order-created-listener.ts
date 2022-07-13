import { Message } from "node-nats-streaming";
import { BadRequestError } from "../../errors/bad-request-error";
import { Ticket } from "../../models/Ticket";
import { Listener } from "../base-listener";
import { TicketUpdatedPublisher } from "../publishers/ticket-updated-publisher";
import { Subjects } from "../subject";
import { queueGroupName } from "./queueGroupName";

export enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  Completed = "completed",
  AwaitingPayment = "awaiting:payment",
}

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    version: number;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    ticket: {
      id: string;
      price: number;
    };
  };
}

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: {
      id: string;
      version: number;
      status: OrderStatus;
      userId: string;
      expiresAt: string;
      ticket: { id: string; price: number };
    },
    message: Message
  ): Promise<void> {
    const ticket = await Ticket.findById(data.ticket.id);

    if (!ticket) {
      throw new BadRequestError("Ticket not found");
    }

    ticket.set({
      orderId: ticket.id,
    });

    await ticket.save();

    new TicketUpdatedPublisher(this.client).publish({
      id: ticket.id,
      price: ticket.price,
      title: ticket.title,
      userId: ticket.userId,
      orderId: ticket.orderId as string,
      version: ticket.version,
    });

    message.ack();
  }
}
