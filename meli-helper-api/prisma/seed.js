const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

async function main() {

  ////////////////////////////////////////////////////////////
  // LIMPA ANÚNCIOS

  await prisma.anuncio.deleteMany()

  ////////////////////////////////////////////////////////////
  // USER TESTE

  let user =
    await prisma.user.findFirst()

  if (!user) {

    user =
      await prisma.user.create({

        data: {

          nome: "Dan",
          nomeLoja: "Loja Teste",

          email: "teste@teste.com",

          senha: "123456"
        }
      })
  }

  ////////////////////////////////////////////////////////////
  // LISTA DE PRODUTOS

  const produtos = [

    ["iPhone 14", "Apple"],
    ["Galaxy S24", "Samsung"],
    ["Redmi Note 13", "Xiaomi"],
    ["Notebook Gamer", "Dell"],
    ["Macbook Air", "Apple"],
    ["Mouse Gamer", "Logitech"],
    ["Teclado Mecânico", "Redragon"],
    ["Monitor 27", "LG"],
    ["Headset Gamer", "HyperX"],
    ["Alexa Echo Dot", "Amazon"],

    ["Smart TV 50", "Samsung"],
    ["SSD 1TB", "Kingston"],
    ["HD Externo", "Seagate"],
    ["Cadeira Gamer", "DXRacer"],
    ["Placa de Vídeo RTX", "Nvidia"],
    ["Processador Ryzen", "AMD"],
    ["Memória RAM 16GB", "Corsair"],
    ["Cooler RGB", "Cooler Master"],
    ["Fonte 750W", "Corsair"],
    ["Webcam Full HD", "Logitech"],

    ["Caixa de Som Bluetooth", "JBL"],
    ["Fone Bluetooth", "Edifier"],
    ["Drone 4K", "DJI"],
    ["Smartwatch", "Huawei"],
    ["Tablet Android", "Samsung"],
    ["iPad", "Apple"],
    ["Carregador Turbo", "Baseus"],
    ["Hub USB", "Ugreen"],
    ["Projetor Full HD", "Epson"],
    ["Kindle", "Amazon"],

    ["Nintendo Switch", "Nintendo"],
    ["Playstation 5", "Sony"],
    ["Xbox Series X", "Microsoft"],
    ["Controle Gamer", "8BitDo"],
    ["Volante Logitech G29", "Logitech"],
    ["Câmera Canon", "Canon"],
    ["GoPro Hero", "GoPro"],
    ["Ring Light", "Generic"],
    ["Microfone USB", "HyperX"],
    ["Mesa Digitalizadora", "Wacom"],

    ["Roteador Wi-Fi 6", "TP-Link"],
    ["Repetidor Wi-Fi", "Intelbras"],
    ["Switch Gigabit", "TP-Link"],
    ["Mini PC", "Beelink"],
    ["Notebook Lenovo", "Lenovo"],
    ["Chromebook", "Acer"],
    ["Smart Lamp", "Positivo"],
    ["Fechadura Digital", "Intelbras"],
    ["Sensor Inteligente", "Tuya"],
    ["Tomada Smart", "Positivo"]
  ]

  ////////////////////////////////////////////////////////////
  // GERAR ANÚNCIOS

  const anuncios = produtos.map(([nome, marca]) => {

    const custo =
      Number((Math.random() * 3000 + 50).toFixed(2))

    const precoVenda =
      Number((custo * (1.3 + Math.random())).toFixed(2))

    const peso =
      Number((Math.random() * 5 + 0.1).toFixed(2))

    const largura =
      Number((Math.random() * 50 + 10).toFixed(2))

    const altura =
      Number((Math.random() * 50 + 5).toFixed(2))

    const comprimento =
      Number((Math.random() * 60 + 10).toFixed(2))

    return {

      nome,
      marca,

      custo,
      precoVenda,

      frete:
        Number((Math.random() * 120).toFixed(2)),

      largura,
      altura,
      comprimento,

      peso,

      userId: user.id
    }
  })

  ////////////////////////////////////////////////////////////

  await prisma.anuncio.createMany({

    data: anuncios
  })

  ////////////////////////////////////////////////////////////

  console.log("✅ 50 produtos criados!")
}

////////////////////////////////////////////////////////////

main()
  .catch(console.error)
  .finally(async () => {

    await prisma.$disconnect()
  })