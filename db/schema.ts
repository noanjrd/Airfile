import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("files", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filepath: text("filepath").notNull(),
  link: text("link").notNull(),
});
