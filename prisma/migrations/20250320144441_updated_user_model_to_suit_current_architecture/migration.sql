/*
  Warnings:

  - You are about to drop the column `linkedIN` on the `socialLinks` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_socialLinks" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT,
    "instagram" TEXT,
    "twitter" TEXT,
    "linkedIn" TEXT,
    "reddit" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "socialLinks_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_socialLinks" ("createdAt", "id", "instagram", "reddit", "twitter", "updatedAt", "userId") SELECT "createdAt", "id", "instagram", "reddit", "twitter", "updatedAt", "userId" FROM "socialLinks";
DROP TABLE "socialLinks";
ALTER TABLE "new_socialLinks" RENAME TO "socialLinks";
CREATE INDEX "socialLinks_userId_idx" ON "socialLinks"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
