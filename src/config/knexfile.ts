export default {
  development: {
    client: "postgresql",
    useNullAsDefault: true,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 1,
      max: 1,
    },
    migrations: {
      tableName: "knex_migrations",
      loadExtensions: [".ts", ".js"],
    },
  },
  production: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
      loadExtensions: [".ts", ".js"],
    },
  },
};
