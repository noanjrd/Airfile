import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fileid : integer("fileid").references(() => files.id),
  link: text("link").notNull(),
  type: text("type", {enum: ["file", "text", "link"]}),
  createdAt: integer("created_at", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});

export const files = sqliteTable("content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filename: text("filename"),
  filepath: text("filepath"),
  text : text("text"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});
