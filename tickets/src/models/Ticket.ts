import mongoose, { Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

type TicketAttrs = {
  title: string;
  price: number;
  userId: string;
};

interface TicketDocument extends Document {
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

interface TicketModel extends Model<TicketDocument> {
  buildTicket: (ticketAttrs: TicketAttrs) => TicketDocument;
}

const TicketSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    orderId: {
      type: String,
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

TicketSchema.set("versionKey", "version");
TicketSchema.plugin(updateIfCurrentPlugin);

TicketSchema.statics.buildTicket = (ticketAttrs: TicketAttrs) => {
  return new Ticket(ticketAttrs);
};

const Ticket = mongoose.model<TicketDocument, TicketModel>(
  "tickets",
  TicketSchema
);

export { Ticket };
