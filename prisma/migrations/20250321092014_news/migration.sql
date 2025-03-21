-- CreateTable
CREATE TABLE "Noticias" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" INTEGER NOT NULL,
    "titular" TEXT NOT NULL,
    "cuerpo" TEXT NOT NULL,
    CONSTRAINT "Noticias_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
