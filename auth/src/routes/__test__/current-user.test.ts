import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";

it("respond with user details", async () => {
  const cookie = await global.signin();

  await request(app)
    .get("/me")
    .set("Cookie", cookie)
    .send()
    .expect(StatusCodes.OK);
});

it("null if unauthroized", async () => {
  await request(app).get("/me").send().expect(StatusCodes.UNAUTHORIZED);
});
