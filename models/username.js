import postgres from "infra/postgres";

async function generate(name) {
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
}

const username = {
  generate,
};

export default username;
