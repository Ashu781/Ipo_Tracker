const request = require("supertest");
const app = require("../src/app");
const pool = require("../src/db/pool");

describe("GET /api/health", () => {
  test("should return database connected status", async () => {
    const response = await request(app).get("/api/health");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("ok");
    expect(response.body.database).toBe("connected");
  });
});

afterAll(async () => {
  await pool.end();
});