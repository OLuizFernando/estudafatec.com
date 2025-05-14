import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator";
import user from "models/user";
import password from "models/password";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("POST /api/users", () => {
  describe("Anonymous user", () => {
    test("With unique and valid data", async () => {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Luiz Fernando",
          email: "luizfernando@example.com",
          password: "password",
        }),
      });

      expect(response.status).toBe(201);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "Luiz Fernando",
        username: "luiz-fernando",
        email: "luizfernando@example.com",
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      const userInDatabase = await user.findOneByUsername("luiz-fernando");
      const correctPasswordMatch = await password.compare(
        "password",
        userInDatabase.hash,
      );

      const incorrectPasswordMatch = await password.compare(
        "incorrect-password",
        userInDatabase.hash,
      );

      expect(correctPasswordMatch).toBe(true);
      expect(incorrectPasswordMatch).toBe(false);
    });

    test("With duplicated email", async () => {
      const response1 = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Name1",
          email: "duplicated@example.com",
          password: "password",
        }),
      });

      expect(response1.status).toBe(201);

      const response2 = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Name2",
          email: "Duplicated@example.com",
          password: "password",
        }),
      });

      expect(response2.status).toBe(400);

      const responseBody = await response2.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 400,
      });
    });

    test("With duplicated name", async () => {
      const response1 = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Duplicated Name",
          email: "email1@example.com",
          password: "password",
        }),
      });

      expect(response1.status).toBe(201);

      const response1Body = await response1.json();

      expect(response1Body.username).toEqual("duplicated-name");

      const response2 = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "Duplicated Name",
          email: "email2@example.com",
          password: "password",
        }),
      });

      expect(response2.status).toBe(201);

      const response2Body = await response2.json();

      expect(response2Body.username).toEqual("duplicated-name-1");
    });
  });
});
