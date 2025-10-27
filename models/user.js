import postgres from "infra/postgres";
import username from "models/username";
import password from "models/password";
import { ValidationError, NotFoundError } from "infra/errors";

async function create(userInputValues) {
  await validateUniqueEmail(userInputValues.email);

  const hash = await hashPassword(userInputValues.password);

  const generatedUsername = await username.generate(userInputValues.name);

  const defaultFeatures = ["read:activation_token"];

  const newUser = await runInsertQuery({
    name: userInputValues.name,
    email: userInputValues.email,
    username: generatedUsername,
    hash,
    defaultFeatures,
  });
  return newUser;

  async function runInsertQuery(userInputValues) {
    const results = await postgres.query({
      text: `
        INSERT INTO
          users (name, username, email, hash, features)
        VALUES
          ($1, $2, $3, $4, $5)
        RETURNING
          *
        ;`,
      values: [
        userInputValues.name,
        userInputValues.username,
        userInputValues.email,
        userInputValues.hash,
        userInputValues.defaultFeatures,
      ],
    });

    return results.rows[0];
  }
}

async function findOneById(id) {
  const userFound = await runSelectQuery(id);

  return userFound;

  async function runSelectQuery(id) {
    const results = await postgres.query({
      text: `
        SELECT
          *
        FROM
          users
        WHERE
          id = $1
        LIMIT
          1
        ;`,
      values: [id],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O id informado não foi encontrado no sistema.",
        action: "Verifique se o id está digitado corretamente.",
      });
    }

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

async function findOneByEmail(email) {
  const userFound = await runSelectQuery(email);

  return userFound;

  async function runSelectQuery(email) {
    const results = await postgres.query({
      text: `
        SELECT
          *
        FROM
          users
        WHERE
          LOWER(email) = LOWER($1)
        LIMIT
          1
        ;`,
      values: [email],
    });

    if (results.rowCount === 0) {
      throw new NotFoundError({
        message: "O email informado não foi encontrado no sistema.",
        action: "Verifique se o email está digitado corretamente.",
      });
    }

    return results.rows[0];
  }
}

async function validateUniqueUsername(username) {
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

  if (results.rowCount > 0) {
    throw new ValidationError({
      message: "O username informado já está em uso por outro usuário.",
      action: "Escolha outro username para realizar esta operação.",
    });
  }
}

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
      action: "Utilize outro email para realizar esta operação.",
    });
  }
}

async function hashPassword(rawPassword) {
  const hashedPassword = await password.hash(rawPassword);

  return hashedPassword;
}

async function update(username, userInputValues) {
  const currentUser = await findOneByUsername(username);

  if (
    "username" in userInputValues &&
    username.toLowerCase() !== userInputValues.username.toLowerCase()
  ) {
    await validateUniqueUsername(userInputValues.username);
  }

  if (
    "email" in userInputValues &&
    currentUser.email.toLowerCase() !== userInputValues.email.toLowerCase()
  ) {
    await validateUniqueEmail(userInputValues.email);
  }

  if ("password" in userInputValues) {
    userInputValues.hash = await hashPassword(userInputValues.password);
  }

  const userWithNewValues = { ...currentUser, ...userInputValues };

  const updatedUser = await runUpdateQuery(userWithNewValues);
  return updatedUser;

  async function runUpdateQuery(userWithNewValues) {
    const results = await postgres.query({
      text: `
        UPDATE
          users
        SET
          name = $1,
          username = $2,
          email = $3,
          hash = $4,
          updated_at = timezone('utc', now())
        WHERE
          id = $5
        RETURNING
          *
        ;`,
      values: [
        userWithNewValues.name,
        userWithNewValues.username,
        userWithNewValues.email,
        userWithNewValues.hash,
        userWithNewValues.id,
      ],
    });

    return results.rows[0];
  }
}

async function setFeatures(userId, features) {
  const updatedUser = await runUpdateQuery(userId, features);

  return updatedUser;

  async function runUpdateQuery(userId, features) {
    const results = await postgres.query({
      text: `
        UPDATE
          users
        SET
          features = $2,
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
        ;`,
      values: [userId, features],
    });

    return results.rows[0];
  }
}

const user = {
  create,
  findOneById,
  findOneByUsername,
  findOneByEmail,
  hashPassword,
  update,
  setFeatures,
};

export default user;
