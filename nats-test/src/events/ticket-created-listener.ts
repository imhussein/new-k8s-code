import { Message } from "node-nats-streaming";
import { Listener } from "./base-listener";
import { Subjects } from "./subject";
import { TicketCreatedEvent } from "./ticket-created-event";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName: string = "payment_service";

  onMessage(data: TicketCreatedEvent["data"], message: Message): void {
    console.log(data);
    message.ack();
  }
}
