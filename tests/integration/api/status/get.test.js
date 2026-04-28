import orchestrator from "tests/orchestrator";
import webserver from "infra/webserver";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const response = await fetch(`${webserver.origin}/api/status`);

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(2);
      expect(Object.keys(responseBody.dependencies).length).toBe(2);
      expect(Object.keys(responseBody.dependencies.postgres).length).toBe(2);
      expect(Object.keys(responseBody.dependencies.mongo).length).toBe(2);

      expect(responseBody.updated_at).toBeDefined();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.postgres.max_connections).toBeDefined();
      expect(
        responseBody.dependencies.postgres.opened_connections,
      ).toBeDefined();
      expect(responseBody.dependencies.postgres.version).toBeUndefined();

      expect(responseBody.dependencies.postgres.max_connections).toBe(100);
      expect(responseBody.dependencies.postgres.opened_connections <= 20).toBe(
        true,
      );

      expect(responseBody.dependencies.mongo.max_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.opened_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.version).toBeUndefined();

      expect(responseBody.dependencies.mongo.max_connections).toBeGreaterThan(
        100,
      );
      expect(responseBody.dependencies.mongo.opened_connections).toBeLessThan(
        1000,
      );
    });
  });

  describe("Default user", () => {
    test("Retrieving current system status", async () => {
      const createdUser = await orchestrator.createUser();
      await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(createdUser);

      const response = await fetch(`${webserver.origin}/api/status`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(2);
      expect(Object.keys(responseBody.dependencies).length).toBe(2);
      expect(Object.keys(responseBody.dependencies.postgres).length).toBe(2);
      expect(Object.keys(responseBody.dependencies.mongo).length).toBe(2);

      expect(responseBody.updated_at).toBeDefined();
      const parsedUpdatedAt = new Date(responseBody.updated_at).toISOString();
      expect(responseBody.updated_at).toEqual(parsedUpdatedAt);

      expect(responseBody.dependencies.postgres.max_connections).toBeDefined();
      expect(
        responseBody.dependencies.postgres.opened_connections,
      ).toBeDefined();
      expect(responseBody.dependencies.postgres.version).toBeUndefined();

      expect(responseBody.dependencies.postgres.max_connections).toBe(100);
      expect(responseBody.dependencies.postgres.opened_connections <= 20).toBe(
        true,
      );

      expect(responseBody.dependencies.mongo.max_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.opened_connections).toBeDefined();
      expect(responseBody.dependencies.mongo.version).toBeUndefined();

      expect(responseBody.dependencies.mongo.max_connections).toBeGreaterThan(
        100,
      );
      expect(responseBody.dependencies.mongo.opened_connections).toBeLessThan(
        1000,
      );
    });
  });

  describe("Privileged user", () => {
    test("With read:status:all", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      await orchestrator.addFeaturesToUser(activatedUser, ["read:status:all"]);
      const sessionObject = await orchestrator.createSession(activatedUser);

      const response = await fetch(`${webserver.origin}/api/status`, {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

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

      expect(responseBody.dependencies.mongo.max_connections).toBeGreaterThan(
        100,
      );
      expect(responseBody.dependencies.mongo.opened_connections).toBeLessThan(
        1000,
      );
      expect(responseBody.dependencies.mongo.version.startsWith("8.0")).toBe(
        true,
      );
    });
  });
});
