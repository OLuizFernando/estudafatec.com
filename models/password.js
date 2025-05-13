import bcryptjs from "bcryptjs";

async function hash(password) {
  const rounds = process.env.NODE_ENV === "production" ? 14 : 1;
  return bcryptjs.hash(password, rounds);
}

async function compare(password, hash) {
  return bcryptjs.compare(password, hash);
}

const password = {
  hash,
  compare,
};

export default password;
