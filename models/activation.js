import email from "infra/email";
import postgres from "infra/postgres";
import webserver from "infra/webserver";
import user from "models/user";
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

async function findOneValidById(tokenId) {
  const activationTokenObject = await runSelectQuery(tokenId);

  return activationTokenObject;

  async function runSelectQuery(tokenId) {
    const results = await postgres.query({
      text: `
        SELECT
          *
        FROM
          user_activation_tokens
        WHERE
          id = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        LIMIT
          1
        ;`,
      values: [tokenId],
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

async function markTokenAsUsed(tokenId) {
  const activatedTokenObject = await runUpdateQuery(tokenId);

  return activatedTokenObject;

  async function runUpdateQuery(tokenId) {
    const results = await postgres.query({
      text: `
        UPDATE
          user_activation_tokens
        SET
          used_at = timezone('utc', now()),
          updated_at = timezone('utc', now())
        WHERE
          id = $1
        RETURNING
          *
        ;`,
      values: [tokenId],
    });

    return results.rows[0];
  }
}

async function activateUserById(userId) {
  const activatedUser = await user.setFeatures(userId, ["create:session"]);
  return activatedUser;
}

const activation = {
  generateToken,
  sendEmailToUser,
  findOneValidById,
  markTokenAsUsed,
  activateUserById,
};

export default activation;
