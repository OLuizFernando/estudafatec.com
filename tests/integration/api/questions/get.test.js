import orchestrator from "tests/orchestrator";
import webserver from "infra/webserver";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
  await orchestrator.clearQuestions();
  await orchestrator.populateQuestions();
});

describe("GET /api/questions", () => {
  describe("Anonymous user", () => {
    test("Retrieving all questions", async () => {
      const response = await fetch(`${webserver.origin}/api/questions`);
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(2);
    });

    test("Retrieving questions of a specific exam", async () => {
      const response = await fetch(
        `${webserver.origin}/api/questions?year=2024&semester=1`,
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(1);
    });

    test("Retrieving a specific question", async () => {
      const response = await fetch(
        `${webserver.origin}/api/questions?year=2025&semester=1&number=1`,
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(1);
    });

    test("Retrieving a non-existent question", async () => {
      const response = await fetch(
        `${webserver.origin}/api/questions?year=0&semester=0&number=0`,
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(0);
      expect(responseBody).toEqual([]);
    });

    test("Retrieving questions with invalid parameters", async () => {
      const response = await fetch(
        `${webserver.origin}/api/questions?invalid=parameter`,
      );
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Parâmetros inválidos detectados: invalid.",
        action:
          "Use apenas parâmetros permitidos: year, semester, number, subject.",
        status_code: 400,
      });
    });
  });
});
