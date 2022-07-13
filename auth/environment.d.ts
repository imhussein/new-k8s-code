import { UserPayload } from "./src/middlewares/authMiddleware";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      MONGO_HOST: string;
      MONGO_PORT: string;
      MONGO_DB: string;
      PORT: string;
      JWT_SECRET: string;
      JWT_EXPIRES_IN: string;
    }
  }
}

export {};
