import mongoose, { Document, Model } from "mongoose";
import { OrderStatus } from "../events/order-status";
import { Order } from "./Order";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

interface TicketAttrs {
  id: string;
  title: string;
  price: number;
}

export interface TicketDocument extends Document {
  title: string;
  price: number;
  version: number;
  isTicketReserved: () => Promise<boolean>;
}

interface TicketModel extends Model<TicketDocument> {
  buildTicket(ticketAttrs: TicketAttrs): TicketDocument;
  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<TicketDocument | null>;
}

const ticketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
      },
    },
  }
);

ticketSchema.set("versionKey", "version");
ticketSchema.plugin(updateIfCurrentPlugin);

ticketSchema.statics.findByEvent = async (event: {
  id: string;
  version: number;
}) => {
  return Ticket.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

ticketSchema.statics.buildTicket = (ticketAtts: TicketAttrs) => {
  return new Ticket({
    _id: ticketAtts.id,
    title: ticketAtts.title,
    price: ticketAtts.price,
  });
};

ticketSchema.methods.isTicketReserved = async function () {
  const isOrderReserved = await Order.findOne({
    ticket: this,
    status: {
      $in: [
        OrderStatus.Created,
        OrderStatus.AwaitingPayment,
        OrderStatus.Completed,
      ],
    },
  });
  return !!isOrderReserved;
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
  "ticket",
  ticketSchema
);

export { Ticket };
