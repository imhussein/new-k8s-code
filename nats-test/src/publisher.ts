import mongoose from "mongoose";
import nats, { Stan } from "node-nats-streaming";
import "colors";
import { randomBytes } from "crypto";
import { TicketCreatedPublisher } from "./events/ticket-created-publisher";

console.clear();

const stan: Stan = nats.connect("ticketing", randomBytes(6).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", async () => {
  console.log("Publisher Connected To Nats".yellow);

  await new TicketCreatedPublisher(stan).publish({
    userId: new mongoose.Types.ObjectId().toHexString(),
    id: "3123",
    price: 12.2,
  });
});
