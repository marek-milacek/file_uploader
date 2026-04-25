const {
    pgTable,
    serial,
    text,
    integer,
    timestamp,
} = require("drizzle-orm/pg-core");

const users = pgTable("users", {
    id: serial("id").primaryKey(),
    email: text("email").notNull().unique(),
    password: text("password").notNull(),
});

const files = pgTable("files", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    path: text("path").notNull(),
    size: integer("size").notNull(),
    userId: integer("user_id").references(() => users.id, {
        onDelete: "cascade",
    }),
    createdAt: timestamp("created_at").defaultNow(),
});

module.exports = { users, files };
