import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("GET /api/questoes", () => {
  describe("Anonymous user", () => {
    test("Retrieving all questions", async () => {
      const response = await fetch("http://localhost:3000/api/questoes");
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBeGreaterThan(0);
    });

    test("Retrieving questions of a specific exam", async () => {
      const response = await fetch(
        "http://localhost:3000/api/questoes?ano=2024&semestre=2",
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(54);
    });

    test("Retrieving a specific question", async () => {
      const response = await fetch(
        "http://localhost:3000/api/questoes?ano=2024&semestre=2&numero=1",
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(1);
    });

    test("Retrieving a non-existent question", async () => {
      const response = await fetch(
        "http://localhost:3000/api/questoes?ano=0&semestre=0&numero=0",
      );
      expect(response.status).toBe(200);

      const responseBody = await response.json();

      expect(Object.keys(responseBody).length).toBe(0);
      expect(responseBody).toEqual([]);
    });

    test("Retrieving questions with invalid parameters", async () => {
      const response = await fetch(
        "http://localhost:3000/api/questoes?invalid=parameter",
      );
      expect(response.status).toBe(400);

      const responseBody = await response.json();

      expect(responseBody).toEqual({
        name: "ValidationError",
        message: "Parâmetros inválidos detectados: invalid.",
        action:
          "Use apenas parâmetros permitidos: ano, semestre, numero, disciplina.",
        status_code: 400,
      });
    });
  });
});
