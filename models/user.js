import postgres from "infra/postgres";
import username from "models/username";
import password from "models/password";
import { ValidationError, NotFoundError } from "infra/errors";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);

  const hash = await hashPassword(userInputValues.password);

  const generatedUsername = await username.generate(userInputValues.name);

  const newUser = await runInsertQuery({
    name: userInputValues.name,
    email: userInputValues.email,
    username: generatedUsername,
    hash,
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

  async function hashPassword(rawPassword) {
    const hashedPassword = await password.hash(rawPassword);

    return hashedPassword;
  }

  async function runInsertQuery(userInputValues) {
    const results = await postgres.query({
      text: `
        INSERT INTO
          users (name, username, email, hash)
        VALUES
          ($1, $2, $3, $4)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.name,
        userInputValues.username,
        userInputValues.email,
        userInputValues.hash,
      ],
    });

    return results.rows[0];
  }
}

async function findOneByUsername(username) {
  const userFound = await runSelectQuery(username);

  return userFound;

  async function runSelectQuery(username) {
    const results = await postgres.query({
      text: `
        SELECT
          *
        FROM
          users
        WHERE
          LOWER(username) = LOWER($1)
        LIMIT
          1
        ;`,
      values: [username],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O username informado não foi encontrado no sistema.",
        action: "Verifique se o username está digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

const user = {
  create,
  findOneByUsername,
};

export default user;
