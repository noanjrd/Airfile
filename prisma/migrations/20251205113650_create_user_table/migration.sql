/*
  Warnings:

  - Added the required column `filepath` to the `Links` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Links" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "link" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "filepath" TEXT NOT NULL
);
INSERT INTO "new_Links" ("createdAt", "id", "link") SELECT "createdAt", "id", "link" FROM "Links";
DROP TABLE "Links";
ALTER TABLE "new_Links" RENAME TO "Links";
CREATE UNIQUE INDEX "Links_link_key" ON "Links"("link");
CREATE UNIQUE INDEX "Links_filepath_key" ON "Links"("filepath");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
