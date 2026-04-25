require("dotenv").config();
const { drizzle } = require("drizzle-orm/postgres-js");
const postgress = require("postgres");
const schema = require("./schema");

const client = postgress(process.env.DATABASE_URL);

const db = drizzle(client, { schema });

module.exports = { db };
