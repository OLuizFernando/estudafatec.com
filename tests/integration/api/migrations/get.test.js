import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("GET /api/migrations", () => {
  describe("Anonymous user", () => {
    test("Retrieving pending migrations", async () => {
      const response = await fetch("http://localhost:3000/api/migrations");
      expect(response.status).toBe(403);

      const respondeBody = await response.json();

      expect(respondeBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para realizar esta ação.",
        action: 'Verifique se o seu usuário possui a feature "read:migration".',
        status_code: 403,
      });
    });
  });

  describe("Default user", () => {
    test("Retrieving pending migrations", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      const sessionObject = await orchestrator.createSession(activatedUser.id);

      const response = await fetch("http://localhost:3000/api/migrations", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(403);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ForbiddenError",
        message: "Você não possui permissão para realizar esta ação.",
        action: 'Verifique se o seu usuário possui a feature "read:migration".',
        status_code: 403,
      });
    });
  });

  describe("Privileged user", () => {
    test("With read:migration", async () => {
      const createdUser = await orchestrator.createUser();
      const activatedUser = await orchestrator.activateUser(createdUser);
      await orchestrator.addFeaturesToUser(activatedUser, ["read:migration"]);
      const sessionObject = await orchestrator.createSession(activatedUser.id);

      const response = await fetch("http://localhost:3000/api/migrations", {
        headers: {
          Cookie: `session_id=${sessionObject.token}`,
        },
      });

      expect(response.status).toBe(200);

      const respondeBody = await response.json();

      expect(Array.isArray(respondeBody)).toBe(true);
      expect(respondeBody.length).toBe(0);
    });
  });
});
