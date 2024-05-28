import app from "../src/app";
import mongoose from "mongoose";
import supertest from "supertest";

const request = supertest(app);
// eslint-disable-next-line no-process-env
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
    const response = await request.post("/api/toys").send({
      category: ["stuffed", "toy"],
      description: "A soft teddy bear",
      images: [],
      name: "Teddy Bear",
      price: 20,
      status: "available",
      tokenValue: 5
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("_id");
    toyId = response.body._id;
  });

  it("should get a list of toys", async () => {
    const response = await request.get("/api/toys");

    expect(response.status).toBe(200);
    // eslint-disable-next-line jest-extended/prefer-to-be-true, jest-extended/prefer-to-be-array
    expect(Array.isArray(response.body)).toBe(true);
  });

  it("should get a toy by ID", async () => {
    const response = await request.get(`/api/toys/${toyId}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id", toyId);
  });

  it("should update a toy by ID", async () => {
    const response = await request.put(`/api/toys/${toyId}`).send({
      name: "Updated Teddy Bear"
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("name", "Updated Teddy Bear");
  });

  it("should delete a toy by ID", async () => {
    const response = await request.delete(`/api/toys/${toyId}`);

    expect(response.status).toBe(200);
  });
});
