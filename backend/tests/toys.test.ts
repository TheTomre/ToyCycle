import mongoose from "mongoose";
import supertest from "supertest";
import app from "../src/app";

const request = supertest(app);
const MONGO_URI = process.env["MONGO_URI"] || "";

beforeAll(async () => {
  if (MONGO_URI) await mongoose.connect(MONGO_URI);
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Toys API", () => {
  let toyId: string;

  it("should create a new toy", async () => {
    const response = await request.post("/api/v1/toys").send({
      category: ["stuffed", "toy"],
      description: "A soft teddy bear",
      images: [],
      name: "Teddy Bear",
      price: 20,
      status: "available",
      tokenValue: 5
    });

    expect(response.status).toBe(201);
    expect(response.body.data).toHaveProperty("_id");
    // eslint-disable-next-line no-underscore-dangle
    toyId = response.body.data._id;
  });

  it("should get a list of toys", async () => {
    const response = await request.get("/api/v1/toys");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body.data)).toBe(true);
  });

  it("should get a toy by ID", async () => {
    const response = await request.get(`/api/v1/toys/${toyId}`);

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("_id", toyId);
  });

  it("should update a toy by ID", async () => {
    const response = await request.put(`/api/v1/toys/${toyId}`).send({
      name: "Updated Teddy Bear"
    });

    expect(response.status).toBe(200);
    expect(response.body.data).toHaveProperty("name", "Updated Teddy Bear");
  });

  it("should delete a toy by ID", async () => {
    const response = await request.delete(`/api/v1/toys/${toyId}`);

    expect(response.status).toBe(204);
  });
});
