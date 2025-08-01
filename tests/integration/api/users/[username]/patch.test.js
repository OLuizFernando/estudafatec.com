import { version as uuidVersion } from "uuid";
import orchestrator from "tests/orchestrator";
import user from "models/user";
import password from "models/password";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
});

describe("PATCH /api/users/[username]", () => {
  describe("Anonymous user", () => {
    test("With new name", async () => {
      const createdUser = await orchestrator.createUser({
        name: "Name",
      });

      const response = await fetch("http://localhost:3000/api/users/name", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: "New Name",
        }),
      });

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "New Name",
        username: "name",
        email: createdUser.email,
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With new password", async () => {
      const createdUser = await orchestrator.createUser({
        password: "oldpassword",
      });

      const response = await fetch(
        `http://localhost:3000/api/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            password: "newpassword",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: createdUser.name,
        username: createdUser.username,
        email: createdUser.email,
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);

      const userInDatabase = await user.findOneByUsername(createdUser.username);

      const newPasswordMatch = await password.compare(
        "newpassword",
        userInDatabase.hash,
      );

      const oldPasswordMatch = await password.compare(
        "oldpassword",
        userInDatabase.hash,
      );

      expect(newPasswordMatch).toBe(true);
      expect(oldPasswordMatch).toBe(false);
    });

    test("With unique username", async () => {
      const createdUser = await orchestrator.createUser({
        name: "Unique Username",
      });

      const response = await fetch(
        "http://localhost:3000/api/users/unique-username",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "new-unique-username",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "Unique Username",
        username: "new-unique-username",
        email: createdUser.email,
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With same username", async () => {
      const createdUser = await orchestrator.createUser({
        name: "Same Username",
      });

      const response = await fetch(
        "http://localhost:3000/api/users/same-username",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "Same-Username",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: "Same Username",
        username: "Same-Username",
        email: createdUser.email,
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With unique email", async () => {
      const createdUser = await orchestrator.createUser({
        email: "uniqueemail@example.com",
      });

      const response = await fetch(
        `http://localhost:3000/api/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "newuniqueemail@example.com",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: createdUser.name,
        username: createdUser.username,
        email: "newuniqueemail@example.com",
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With same email", async () => {
      const createdUser = await orchestrator.createUser({
        email: "sameemail@example.com",
      });

      const response = await fetch(
        `http://localhost:3000/api/users/${createdUser.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "SameEmail@example.com",
          }),
        },
      );

      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        id: responseBody.id,
        name: createdUser.name,
        username: createdUser.username,
        email: "SameEmail@example.com",
        hash: responseBody.hash,
        created_at: responseBody.created_at,
        updated_at: responseBody.updated_at,
      });

      expect(uuidVersion(responseBody.id)).toBe(4);
      expect(Date.parse(responseBody.created_at)).not.toBeNaN();
      expect(Date.parse(responseBody.updated_at)).not.toBeNaN();

      expect(responseBody.updated_at > responseBody.created_at).toBe(true);
    });

    test("With non-existent username", async () => {
      const response = await fetch(
        "http://localhost:3000/api/users/non-existent",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: "new-username",
          }),
        },
      );

      expect(response.status).toBe(404);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "NotFoundError",
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username está digitado corretamente.",
        status_code: 404,
      });
    });

    test("With duplicated username", async () => {
      await orchestrator.createUser({
        name: "User 1",
      });

      await orchestrator.createUser({
        name: "User 2",
      });

      const response = await fetch("http://localhost:3000/api/users/user-2", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: "user-1",
        }),
      });

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O username informado já está em uso por outro usuário.",
        action: "Escolha outro username para realizar esta operação.",
        status_code: 400,
      });
    });

    test("With duplicated email", async () => {
      await orchestrator.createUser({
        email: "duplicatedemail1@example.com",
      });

      const createdUser2 = await orchestrator.createUser({
        email: "duplicatedemail2@example.com",
      });

      const response = await fetch(
        `http://localhost:3000/api/users/${createdUser2.username}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "duplicatedemail1@example.com",
          }),
        },
      );

      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar esta operação.",
        status_code: 400,
      });
    });
  });
});
