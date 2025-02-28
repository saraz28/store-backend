import { Pool } from "pg";

describe("Database Connection", () => {
  it("should connect to the PostgreSQL database", async () => {
    let client = new Pool({
      host: process.env.POSTGRES_HOST,
      database: process.env.POSTGRES_DB,
      user: process.env.POSTGRES_USER,
      password: process.env.POSTGRES_PASSWORD,
    });
    try {
      const conn = await client.connect();
      conn.release();
      expect(true).toBe(true);
    } catch (error) {
      console.error("Error connecting to database", error);
      fail("Failed to connect to the database");
    }
  });
});
