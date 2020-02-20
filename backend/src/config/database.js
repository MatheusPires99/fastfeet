module.exports = {
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "fastfeet",
  database: "fastfeet",
  define: {
    timestamps: true,
    underscored: true,
    underscoredAll: true,
  },
  dialectOptions: {
    useUTC: false,
  },
  timezone: "-03:00",
};
