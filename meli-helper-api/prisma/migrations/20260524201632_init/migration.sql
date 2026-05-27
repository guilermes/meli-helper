-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Anuncio" (
    "id" SERIAL NOT NULL,
    "idMercadoLivre" TEXT,
    "nome" TEXT NOT NULL,
    "marca" TEXT NOT NULL,
    "custo" DOUBLE PRECISION NOT NULL,
    "precoVenda" DOUBLE PRECISION NOT NULL,
    "frete" DOUBLE PRECISION,
    "largura" DOUBLE PRECISION,
    "altura" DOUBLE PRECISION,
    "comprimento" DOUBLE PRECISION,
    "peso" DOUBLE PRECISION,

    CONSTRAINT "Anuncio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Configuracao" (
    "id" SERIAL NOT NULL,
    "comissao" DOUBLE PRECISION NOT NULL,
    "imposto" DOUBLE PRECISION NOT NULL,
    "custoOperacional" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Configuracao_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
