import postgres from "infra/postgres";
import { ValidationError } from "infra/errors";

async function register(waitlistUserInputValues) {
  await validateUniqueEmail(waitlistUserInputValues.email);

  const newUser = await runInsertQuery({
    name: waitlistUserInputValues.name,
    email: waitlistUserInputValues.email,
  });
  return newUser;

  async function validateUniqueEmail(email) {
    const results = await postgres.query({
      text: `
          SELECT
            email
          FROM
            waitlist
          WHERE
            LOWER(email) = LOWER($1)
          ;`,
      values: [email],
    });

    if (results.rowCount > 0) {
      throw new ValidationError({
        message: "O email informado já está cadastrado na lista de espera.",
        action: "Utilize outro email para realizar esta operação.",
      });
    }
  }

  async function runInsertQuery(waitlistUserInputValues) {
    const results = await postgres.query({
      text: `
        INSERT INTO
          waitlist (name, email)
        VALUES
          ($1, $2)
        RETURNING
          *
        ;`,
      values: [waitlistUserInputValues.name, waitlistUserInputValues.email],
    });

    return results.rows[0];
  }
}

const user = {
  register,
};

export default user;
