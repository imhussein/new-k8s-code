import { StatusCodes } from "http-status-codes";
import request from "supertest";
import { app } from "../../app";

let email = "moahmed@gmai.com";
let password = "123456";

it("fails when no email that is supplied", async () => {
  await request(app)
    .post("/login")
    .send({
      email,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("fails when no password that is supplied", async () => {
  await request(app)
    .post("/login")
    .send({
      email,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("fails when an email that doesn't exists is supplied", async () => {
  await request(app)
    .post("/login")
    .send({
      email,
      password,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("fails when an email that doesn't exists is supplied", async () => {
  await request(app)
    .post("/register")
    .send({
      email,
      password,
    })
    .expect(StatusCodes.CREATED);
  await request(app)
    .post("/login")
    .send({
      email: `dasdas@gmail.com`,
      password,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("fails when incorrect password is supplied", async () => {
  await request(app)
    .post("/register")
    .send({
      email,
      password,
    })
    .expect(StatusCodes.CREATED);
  await request(app)
    .post("/login")
    .send({
      email,
      password: `324rfdasfd`,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("fails when an email that doesn't exists is supplied", async () => {
  await request(app)
    .post("/login")
    .send({
      email,
      password,
    })
    .expect(StatusCodes.BAD_REQUEST);
});

it("sets a cookie after successfull login", async () => {
  await request(app)
    .post("/register")
    .send({ email, password })
    .expect(StatusCodes.CREATED);

  const res = await request(app)
    .post("/login")
    .send({ email, password })
    .expect(StatusCodes.OK);

  expect(res.get("Set-Cookie")).toBeDefined();
});
