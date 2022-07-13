import { Publisher } from "../base-publisher";
import { Subjects } from "../subject";

interface TicketUpdatedEvent {
  subject: Subjects.TicketUpdated;
  data: {
    userId: string;
    orderId?: string;
    version: number;
    price: number;
    title: string;
    id: string;
  };
}

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
