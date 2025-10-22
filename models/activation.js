import email from "infra/email";
import postgres from "infra/postgres";
import webserver from "infra/webserver";
import { NotFoundError } from "infra/errors";

const EXPIRATION_IN_MILLISECONDS = 60 * 15 * 1000; // 15 minutes

async function generateToken(userId) {
  const expiresAt = new Date(Date.now() + EXPIRATION_IN_MILLISECONDS);

  const newToken = await runInsertQuery(userId, expiresAt);
  return newToken;

  async function runInsertQuery(userId, expiresAt) {
    const results = await postgres.query({
      text: `
        INSERT INTO
          user_activation_tokens (user_id, expires_at)
        VALUES
          ($1, $2)
        RETURNING
          *
      ;`,
      values: [userId, expiresAt],
    });

    return results.rows[0];
  }
}

async function sendEmailToUser(user, activationToken) {
  await email.send({
    from: "EstudaFatec.com <contato@estudafatec.com>",
    to: user.email,
    subject: "Ative seu cadastro no EstudaFatec.com!",
    text: `${user.name}, clique no link abaixo parra ativar seu cadastro no EstudaFatec.com:
    
${webserver.origin}/register/activation/${activationToken.id}

Atenciosamente,
Equipe EstudaFatec.com`,
  });
}

async function findOneByUserId(userId) {
  const activationTokenFound = await runSelectQuery(userId);

  return activationTokenFound;

  async function runSelectQuery(userId) {
    const results = await postgres.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          user_id = $1
        LIMIT
          1
        ;`,
      values: [userId],
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

const activation = {
  generateToken,
  sendEmailToUser,
  findOneByUserId,
};

export default activation;
