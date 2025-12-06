import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filepath: text("filepath").notNull(),
  link: text("link").notNull(),
});

export const files = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename").notNull(),
  filepath: text("filepath").notNull(),
});
