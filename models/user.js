import postgres from "infra/postgres";
import { ValidationError } from "infra/errors";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);

  const username = await generateUniqueUsername(userInputValues.name);

  const newUser = await runInsertQuery({
    ...userInputValues,
    username,
  });
  return newUser;

  async function validateUniqueEmail(email) {
    const results = await postgres.query({
      text: `
        SELECT
          email
        FROM
          users
        WHERE
          LOWER(email) = LOWER($1)
        ;`,
      values: [email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O email informado já está sendo utilizado.",
        action: "Utilize outro email para realizar o cadastro.",
      });
    }
  }

  async function generateUniqueUsername(name) {
    const base = name
      .toLowerCase()
      .normalize("NFD") // Normalize the string to separate letters from diacritics (e.g., "é" → "e + ́ ")
      .replace(/[\u0300-\u036f]/g, "") // Remove diacritical marks ("~", "^", "ç", etc.)
      .replace(/[^a-z0-9]+/g, "-") // Replace non-alphanumeric characters with hyphens
      .replace(/(^-|-$)+/g, ""); // Remove leading and trailing hyphens

    let username = base;
    let counter = 0;

    while (await isUsernameTaken(username)) {
      counter++;
      username = `${base}-${counter}`;
    }

    return username;
  }

  async function isUsernameTaken(username) {
    const results = await postgres.query({
      text: `
        SELECT
          username
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
        ;`,
      values: [username],
    });

    return results.rowCount > 0;
  }

  async function runInsertQuery(userInputValues) {
    const results = await postgres.query({
      text: `
        INSERT INTO
          users (name, username, email, password)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.name,
        userInputValues.username,
        userInputValues.email,
        userInputValues.password,
      ],
    });

    return results.rows[0];
  }
}

const user = {
  create,
};

export default user;
