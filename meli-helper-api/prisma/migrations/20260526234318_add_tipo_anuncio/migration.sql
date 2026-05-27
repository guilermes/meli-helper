-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idMercadoLivre" TEXT,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "tipoAnuncio" TEXT NOT NULL DEFAULT 'CLASSICO',
    "custo" REAL NOT NULL,
    "precoVenda" REAL NOT NULL,
    "frete" REAL,
    "largura" REAL,
    "altura" REAL,
    "comprimento" REAL,
    "peso" REAL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Anuncio_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Anuncio" ("altura", "comprimento", "custo", "frete", "id", "idMercadoLivre", "largura", "marca", "nome", "peso", "precoVenda", "userId") SELECT "altura", "comprimento", "custo", "frete", "id", "idMercadoLivre", "largura", "marca", "nome", "peso", "precoVenda", "userId" FROM "Anuncio";
DROP TABLE "Anuncio";
ALTER TABLE "new_Anuncio" RENAME TO "Anuncio";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
