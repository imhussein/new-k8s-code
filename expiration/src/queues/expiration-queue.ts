import Queue from "bull";
import { REDIS_HOST, REDIS_PORT } from "../config/keys";

interface Payload {
  orderId: string;
}

const expirationQueue = new Queue<Payload>("order:expiration", {
  redis: {
    host: REDIS_HOST,
    port: parseInt(REDIS_PORT),
  },
});

expirationQueue.process(async (job) => {
  console.log(job.data.orderId);
});

export { expirationQueue };
