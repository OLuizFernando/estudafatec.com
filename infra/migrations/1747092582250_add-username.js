exports.up = (pgm) => {
  pgm.addColumn("users", {
    username: {
      type: "varchar(30)", // For reference, GitHub limits usernames to 39 characters.
      notNull: true,
      unique: true,
    },
  });
};

exports.down = false;
