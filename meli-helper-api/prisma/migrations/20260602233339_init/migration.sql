-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "nomeLoja" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "nicho" TEXT,
    "nivelSeller" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avatar" TEXT
);

-- CreateTable
CREATE TABLE "Anuncio" (
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

-- CreateTable
CREATE TABLE "Configuracao" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "imposto" REAL,
    "custoOperacional" REAL,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "Configuracao_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Configuracao_userId_key" ON "Configuracao"("userId");
