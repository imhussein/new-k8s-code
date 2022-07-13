import express from "express";
import cors from "cors";
import morgan from "morgan";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import cookieSession from "cookie-session";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import { healthCheckMiddleware } from "./middlewares/health-check-middleware";
import { newTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { updateTicketRouter } from "./routes/update";
import { listTicketsRouter } from "./routes/list";
import { deleteAllTickets } from "./routes/deleteTickets";

const app = express();
app.set("trust proxy", true);
app.use(express.json());
app.use(
  cookieSession({
    signed: false,
  })
);
app.use(cors());
// if (process.env.NODE_ENV !== "test") {
//   app.use(morgan("combined"));
// }

app.get("/", healthCheckMiddleware);
app.use(newTicketRouter);
app.use(showTicketRouter);
app.use(updateTicketRouter);
app.use(listTicketsRouter);
app.use(deleteAllTickets);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
