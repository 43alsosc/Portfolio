import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

// Definer tabellene eller Enum i databasen
export const statusEnum = pgEnum("status_enum", [
  "checked_in",
  "not_checked_in",
]);

export const elevTable = pgTable("elev_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  username: text("username").notNull(),
  status: statusEnum("status").default("not_checked_in"),
  checked_in_at: timestamp("checked_in_at"),
  group_id: text("group_id"),
});

// Definer type for insert og Select
export type InsertUser = typeof elevTable.$inferInsert;
export type SelectUser = typeof elevTable.$inferSelect;
