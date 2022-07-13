import express from "express";
import cors from "cors";
import morgan from "morgan";

import { errorMiddleware } from "./middlewares/errorMiddleware";
import cookieSession from "cookie-session";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import { healthCheckMiddleware } from "./middlewares/health-check-middleware";
import { newOrderRouter } from "./routes/new";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";
import { showOrderRouter } from "./routes/show";
import { listTickets } from "./routes/tickets";
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
app.use(newOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);
app.use(showOrderRouter);
app.use(listTickets);
app.use(deleteAllTickets);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
