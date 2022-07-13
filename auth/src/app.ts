import express from "express";
import cors from "cors";
import morgan from "morgan";
import { currentUserRouter } from "./routes/current-user";
import { signInRouter } from "./routes/signin";
import { signOutRouter } from "./routes/signout";
import { signUpRouter } from "./routes/signup";
import { errorMiddleware } from "./middlewares/errorMiddleware";
import cookieSession from "cookie-session";
import { notFoundMiddleware } from "./middlewares/not-found-middleware";
import { healthCheckMiddleware } from "./middlewares/health-check-middleware";

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

app.use(currentUserRouter);
app.use(signInRouter);
app.use(signUpRouter);
app.use(signOutRouter);
app.use(notFoundMiddleware);
app.use(errorMiddleware);

export { app };
