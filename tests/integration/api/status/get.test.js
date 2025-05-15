import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch("http://localhost:3000/api/status");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(2);
      expect(Object.keys(responseBody.dependencies).length).toBe(2);
      expect(Object.keys(responseBody.dependencies.postgres).length).toBe(3);
      expect(Object.keys(responseBody.dependencies.mongo).length).toBe(3);

      expect(responseBody.updated_at).toBeDefined();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.postgres.max_connections).toBeDefined();
      expect(
        responseBody.dependencies.postgres.opened_connections,
      ).toBeDefined();
      expect(responseBody.dependencies.postgres.version).toBeDefined();

      expect(responseBody.dependencies.postgres.max_connections).toBe(100);
      expect(responseBody.dependencies.postgres.opened_connections <= 20).toBe(
        true,
      );
      expect(responseBody.dependencies.postgres.version).toBe("16.0");

      expect(responseBody.dependencies.mongo.max_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.opened_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.version).toBeDefined();

      expect(responseBody.dependencies.mongo.max_connections).toBe(500);
      expect(responseBody.dependencies.mongo.opened_connections).toBeLessThan(
        500,
      );
      expect(responseBody.dependencies.mongo.version).toBe("8.0.9");
    });
  });
});
