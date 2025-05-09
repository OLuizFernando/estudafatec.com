import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
});

describe("GET /api/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/migrations");
      expect(response.status).toBe(200);

      const respondeBody = await response.json();

      expect(Array.isArray(respondeBody)).toBe(true);
      expect(respondeBody.length).toBeGreaterThan(0);
    });
  });
});
