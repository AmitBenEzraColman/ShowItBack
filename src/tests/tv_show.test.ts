import request from "supertest";
import initApp from "../app";
import { Express } from "express";
import User, { IUser } from "../models/user_model";
import mongoose from "mongoose";

let app: Express;
let accessTokenCookie = "";
let userId = "";

const user: IUser = {
  fullName: "John Doe",
  email: "john@student.com",
  password: "1234567890",
  imgUrl: "https://www.google.com",
};

beforeAll(async () => {
  app = await initApp();
  console.log("beforeAll");
  await User.deleteMany({ email: user.email });
  const response = await request(app).post("/auth/register").send(user);
  accessTokenCookie = response.headers["set-cookie"][1]
    .split(",")
    .map((item) => item.split(";")[0])
    .join(";");
  userId = response.body._id;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Search TV Show tests", () => {
  test("Should return 200 and the search results", async () => {
    const searchTerm = "The Vampire diaries";

    const response = await request(app)
      .get(`/tvshows/search/${searchTerm}`)
      .set("Cookie", accessTokenCookie);

    expect(response.statusCode).toBe(200);
    expect(response.body).toBeInstanceOf(Array);
  });
});

