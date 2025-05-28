exports.up = (pgm) => {
  pgm.createTable("waitlist", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },

    name: {
      type: "varchar(100)",
      notNull: true,
    },

    // Why 254 in length? https://stackoverflow.com/a/1199238/
    email: {
      type: "varchar(254)",
      notNull: true,
      unique: true,
    },

    // Why timestamp with timezone? https://justatheory.com/2012/04/postgres-use-timestamptz/
    created_at: {
      type: "timestamptz",
      notNull: true,
      default: pgm.func("timezone('utc', now())"),
    },
  });
};

exports.down = false;
