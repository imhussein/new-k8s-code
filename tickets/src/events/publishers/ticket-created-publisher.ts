import { Publisher } from "../base-publisher";
import { Subjects } from "../subject";

interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    userId: string;
    price: number;
    version: number;
    title: string;
    id: string;
  };
}

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
