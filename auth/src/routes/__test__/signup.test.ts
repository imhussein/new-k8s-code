import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";

let email = "moahmed@gmai.com";
let password = "123456";

it("returns a 201 on a successfull signup", async () => {
  return request(app)
    .post("/register")
    .send({
      email,
      password,
    })
    .expect(StatusCodes.CREATED);
});

it("returns a 400 with invalid email and password", async () => {
  return request(app)
    .post("/register")
    .send({})
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/register")
    .send({ password })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 400 with invalid password", async () => {
  return request(app)
    .post("/register")
    .send({ email })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 400 with invalid email", async () => {
  return request(app)
    .post("/register")
    .send({ email: "mohamed", password })
    .expect(StatusCodes.BAD_REQUEST);
});

it("returns a 400 with short password", async () => {
  return request(app)
    .post("/register")
    .send({ email, password: "2" })
    .expect(StatusCodes.BAD_REQUEST);
});

it("disallows displicate email", async () => {
  await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.CREATED);
  await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.BAD_REQUEST);
});

it("sets a cookie after successfull signup", async () => {
  const res = await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.CREATED);

  expect(res.get("Set-Cookie")).toBeDefined();
});
