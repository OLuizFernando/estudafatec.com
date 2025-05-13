exports.up = (pgm) => {
  pgm.renameColumn("users", "password", "hash");
};

exports.down = false;
