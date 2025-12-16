import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";

export const pages = sqliteTable("pages", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  fileid : integer("fileid").references(() => content.id),
  link: text("link").notNull(),
  type: text("type", {enum: ["file", "text"]}),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});

export const content = sqliteTable("content", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  filenames: text("filenames", {mode : "json"}).$type<string[]>(),
  filepaths: text("filepaths", {mode : "json"}).$type<string[]>(),
  text : text("text"),
  createdAt: integer("createdAt", { mode: "timestamp" }).notNull().$defaultFn(() => new Date())
});
