import nats from "node-nats-streaming";
import "colors";
import { randomBytes } from "crypto";
import { TicketCreatedListener } from "./events/ticket-created-listener";

console.clear();

const stan = nats.connect("ticketing", randomBytes(6).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("close", () => {
  console.log("Nats Connection Closed");
  process.exit();
});

stan.on("connect", () => {
  console.log(`Listener Connected to nats`.yellow);

  process.on("SIGINT", () => {
    stan.close();
  });

  process.on("SIGTERM", () => {
    stan.close();
  });

  const ticketCreatedEvent = new TicketCreatedListener(stan);
  ticketCreatedEvent.listen();
});
