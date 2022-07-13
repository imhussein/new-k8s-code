import { Message } from "node-nats-streaming";
import { expirationQueue } from "../queues/expiration-queue";
import { Listener } from "./base-listener";
import { queueGroupName } from "./queueGroupName";

export enum OrderStatus {
  Created = "created",
  Cancelled = "cancelled",
  Completed = "completed",
  AwaitingPayment = "awaiting:payment",
}

export enum Subjects {
  TicketCreated = "ticket:created",
  TicketUpdated = "ticket:updated",
  OrderUpdated = "order:updated",
  OrderCreated = "order:created",
  OrderCancelled = "order:cancelled",
}

interface OrderCreatedEvent {
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
      orderId?: string;
      ticket: { id: string; price: number };
    },
    message: Message
  ): Promise<void> {
    await expirationQueue.add({
      orderId: data.id,
    });
    message.ack();
  }
}
