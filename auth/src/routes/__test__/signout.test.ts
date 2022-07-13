import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";

let email = "moahmed@gmai.com";
let password = "123456";

it("successfull signout", async () => {
  await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.CREATED);

  const res = await request(app)
    .post("/login")
    .send({ email, password })
    .expect(StatusCodes.OK);

  expect(res.get("Set-Cookie")).toBeDefined();

  const logoutResponse = await request(app)
    .post("/logout")
    .send({})
    .expect(StatusCodes.OK);

  expect(logoutResponse.get("Set-Cookie")[0]).toEqual(
    "session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
  );
});
