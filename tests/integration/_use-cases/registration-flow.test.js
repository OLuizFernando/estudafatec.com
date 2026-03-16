import activation from "models/activation";
import orchestrator from "tests/orchestrator";
import webserver from "infra/webserver";
import user from "models/user";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearDatabase();
  await orchestrator.runPendingMigrations();
  await orchestrator.deleteAllEmails();
});

describe("Use case: Registration Flow (all successful)", () => {
  let createUserResponseBody;
  let activationTokenId;
  let activatedUser;
  let createSessionResponseBody;

  test("Create user account", async () => {
    const createUserResponse = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: "Registration Flow",
        email: "registration.flow@example.com",
        password: "registrationflow",
      }),
    });

    expect(createUserResponse.status).toBe(201);

    createUserResponseBody = await createUserResponse.json();

    expect(createUserResponseBody).toEqual({
      id: createUserResponseBody.id,
      name: "Registration Flow",
      username: "registration-flow",
      email: "registration.flow@example.com",
      features: ["read:activation_token"],
      hash: createUserResponseBody.hash,
      created_at: createUserResponseBody.created_at,
      updated_at: createUserResponseBody.updated_at,
    });
  });

  test("Receive activation email", async () => {
    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@estudafatec.com>");
    expect(lastEmail.recipients[0]).toBe("<registration.flow@example.com>");
    expect(lastEmail.subject).toBe("Ative seu cadastro no EstudaFatec.com!");
    expect(lastEmail.text).toContain("Registration Flow");

    activationTokenId = orchestrator.extractUUID(lastEmail.text);

    expect(lastEmail.text).toContain(
      `${webserver.origin}/register/activation/${activationTokenId}`,
    );

    const activationTokenObject =
      await activation.findOneValidById(activationTokenId);

    expect(activationTokenObject.user_id).toBe(createUserResponseBody.id);
    expect(activationTokenObject.used_at).toBe(null);
  });

  test("Activate account", async () => {
    const activationResponse = await fetch(
      `http://localhost:3000/api/activations/${activationTokenId}`,
      {
        method: "PATCH",
      },
    );

    expect(activationResponse.status).toBe(200);

    const activationResponseBody = await activationResponse.json();

    expect(Date.parse(activationResponseBody.used_at)).not.toBeNaN();

    activatedUser = await user.findOneByUsername("registration-flow");

    expect(activatedUser.features).toEqual([
      "create:session",
      "read:session",
      "update:user",
    ]);
  });

  test("Login", async () => {
    const createSessionResponse = await fetch(
      "http://localhost:3000/api/sessions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: "registration.flow@example.com",
          password: "registrationflow",
        }),
      },
    );

    expect(createSessionResponse.status).toBe(201);

    createSessionResponseBody = await createSessionResponse.json();

    expect(createSessionResponseBody.user_id).toBe(createUserResponseBody.id);
  });

  test("Activate account again", async () => {
    const reactivationResponse = await fetch(
      `http://localhost:3000/api/activations/${activationTokenId}`,
      {
        method: "PATCH",
        headers: {
          Cookie: `session_id=${createSessionResponseBody.token}`,
        },
      },
    );

    expect(reactivationResponse.status).toBe(403);

    const reactivationResponseBody = await reactivationResponse.json();

    expect(reactivationResponseBody).toEqual({
      name: "ForbiddenError",
      message: "Você não possui permissão para realizar esta ação.",
      action:
        'Verifique se o seu usuário possui a feature "read:activation_token".',
      status_code: 403,
    });
  });

  test("Get user information", async () => {
    const userInformationResponse = await fetch(
      "http://localhost:3000/api/user",
      {
        method: "GET",
        headers: {
          Cookie: `session_id=${createSessionResponseBody.token}`,
        },
      },
    );

    expect(userInformationResponse.status).toBe(200);

    const userInformationResponseBody = await userInformationResponse.json();

    expect(userInformationResponseBody).toEqual({
      id: createUserResponseBody.id,
      name: "Registration Flow",
      username: "registration-flow",
      email: "registration.flow@example.com",
      features: ["create:session", "read:session", "update:user"],
      hash: createUserResponseBody.hash,
      created_at: createUserResponseBody.created_at,
      updated_at: activatedUser.updated_at.toISOString(),
    });
  });
});
