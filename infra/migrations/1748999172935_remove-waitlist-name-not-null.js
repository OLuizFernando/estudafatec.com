exports.up = (pgm) => {
  pgm.alterColumn("waitlist", "name", {
    notNull: false,
  });
};

exports.down = false;
