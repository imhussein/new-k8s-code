import { Subjects } from "./subject";

export interface TicketCreatedEvent {
  subject: Subjects.TicketCreated;
  data: {
    version: number;
    id: string;
    price: number;
    userId: string;
  };
}
