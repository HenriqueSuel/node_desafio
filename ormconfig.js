const rootDir = process.env.NODE_ENV === 'DEVELOPMENT' ? 'src' : 'dist';
const extensionFile = process.env.NODE_ENV === 'DEVELOPMENT' ? 'ts' : 'js';
const extra = process.env.NODE_ENV === 'DEVELOPMENT' ? null : {
  extra: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
};

module.exports = {
  type: "postgres",
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  synchronize: false,
  ...extra,
  migrations: ["./" + rootDir + "/shared/infra/typeorm/migrations/*." + extensionFile],
  entities: ["./" + rootDir + "/modules/**/entities/*." + extensionFile],
  cli: {
    migrationsDir: "./" + rootDir + "/shared/infra/typeorm/migrations",
  },
}