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
      NATS_CLUSTER_ID: string;
      NATS_CLIENT_ID: string;
      NATS_HOST: string;
      NATS_PORT: string;
      REDIS_HOST: string;
      REDIS_PORT: string;
    }
  }
}

export {};
