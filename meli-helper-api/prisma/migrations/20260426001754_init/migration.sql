-- CreateTable
CREATE TABLE "Anuncio" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "idMercadoLivre" TEXT,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "custo" REAL NOT NULL,
    "precoVenda" REAL NOT NULL,
    "frete" REAL NOT NULL
);
