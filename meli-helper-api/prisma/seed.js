// prisma/seed.js
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const produtos = [
  { nome: 'Smartphone Samsung Galaxy A54', marca: 'Samsung', custo: 890, preco: 1299, peso: 0.19, largura: 15, altura: 1, comprimento: 7 },
  { nome: 'Smartphone Xiaomi Redmi Note 12', marca: 'Xiaomi', custo: 620, preco: 899, peso: 0.19, largura: 16, altura: 1, comprimento: 7 },
  { nome: 'Smartphone Motorola Moto G84', marca: 'Motorola', custo: 700, preco: 999, peso: 0.17, largura: 16, altura: 1, comprimento: 7 },
  { nome: 'Notebook Dell Inspiron 15', marca: 'Dell', custo: 2800, preco: 3899, peso: 1.8, largura: 36, altura: 2, comprimento: 24 },
  { nome: 'Notebook Lenovo IdeaPad 3', marca: 'Lenovo', custo: 2200, preco: 3199, peso: 1.7, largura: 36, altura: 2, comprimento: 24 },
  { nome: 'Notebook Acer Aspire 5', marca: 'Acer', custo: 2400, preco: 3399, peso: 1.9, largura: 36, altura: 2, comprimento: 25 },
  { nome: 'Notebook HP Pavilion 15', marca: 'HP', custo: 2600, preco: 3599, peso: 1.75, largura: 36, altura: 2, comprimento: 24 },
  { nome: 'Smart TV Samsung 50" 4K', marca: 'Samsung', custo: 1800, preco: 2499, peso: 11, largura: 112, altura: 8, comprimento: 65 },
  { nome: 'Smart TV LG 55" OLED', marca: 'LG', custo: 3800, preco: 5499, peso: 17, largura: 123, altura: 9, comprimento: 71 },
  { nome: 'Smart TV TCL 43" 4K', marca: 'TCL', custo: 1100, preco: 1599, peso: 8, largura: 97, altura: 7, comprimento: 57 },
  { nome: 'Tablet Samsung Galaxy Tab A8', marca: 'Samsung', custo: 950, preco: 1399, peso: 0.49, largura: 25, altura: 1, comprimento: 16 },
  { nome: 'Tablet Xiaomi Pad 6', marca: 'Xiaomi', custo: 1400, preco: 1999, peso: 0.49, largura: 25, altura: 1, comprimento: 16 },
  { nome: 'Fone Bluetooth JBL Tune 510BT', marca: 'JBL', custo: 180, preco: 289, peso: 0.16, largura: 18, altura: 7, comprimento: 17 },
  { nome: 'Fone Bluetooth Sony WH-1000XM5', marca: 'Sony', custo: 1200, preco: 1799, peso: 0.25, largura: 20, altura: 8, comprimento: 17 },
  { nome: 'Fone In-ear Apple AirPods Pro', marca: 'Apple', custo: 1500, preco: 2199, peso: 0.06, largura: 6, altura: 5, comprimento: 4 },
  { nome: 'Fone In-ear Samsung Galaxy Buds2', marca: 'Samsung', custo: 450, preco: 699, peso: 0.06, largura: 6, altura: 5, comprimento: 4 },
  { nome: 'Smartwatch Samsung Galaxy Watch6', marca: 'Samsung', custo: 950, preco: 1399, peso: 0.09, largura: 10, altura: 3, comprimento: 8 },
  { nome: 'Smartwatch Apple Watch SE 2', marca: 'Apple', custo: 1600, preco: 2299, peso: 0.1, largura: 10, altura: 3, comprimento: 8 },
  { nome: 'Smartwatch Xiaomi Mi Band 8', marca: 'Xiaomi', custo: 150, preco: 249, peso: 0.03, largura: 5, altura: 2, comprimento: 2 },
  { nome: 'Câmera Canon EOS Rebel SL3', marca: 'Canon', custo: 3200, preco: 4499, peso: 0.45, largura: 12, altura: 7, comprimento: 9 },
  { nome: 'Câmera Sony Alpha A6400', marca: 'Sony', custo: 5500, preco: 7499, peso: 0.4, largura: 12, altura: 7, comprimento: 6 },
  { nome: 'Webcam Logitech C920', marca: 'Logitech', custo: 320, preco: 499, peso: 0.16, largura: 9, altura: 4, comprimento: 7 },
  { nome: 'Webcam Razer Kiyo Pro', marca: 'Razer', custo: 550, preco: 799, peso: 0.18, largura: 9, altura: 4, comprimento: 7 },
  { nome: 'Mouse Logitech MX Master 3', marca: 'Logitech', custo: 380, preco: 549, peso: 0.14, largura: 8, altura: 5, comprimento: 12 },
  { nome: 'Mouse Razer DeathAdder V3', marca: 'Razer', custo: 280, preco: 429, peso: 0.12, largura: 7, altura: 4, comprimento: 12 },
  { nome: 'Teclado Mecânico Keychron K2', marca: 'Keychron', custo: 420, preco: 599, peso: 0.55, largura: 33, altura: 4, comprimento: 12 },
  { nome: 'Teclado Mecânico Redragon Kumara', marca: 'Redragon', custo: 180, preco: 289, peso: 0.5, largura: 44, altura: 4, comprimento: 13 },
  { nome: 'Monitor LG 24" Full HD', marca: 'LG', custo: 680, preco: 999, peso: 3.5, largura: 54, altura: 5, comprimento: 37 },
  { nome: 'Monitor Samsung 27" QHD', marca: 'Samsung', custo: 1200, preco: 1699, peso: 5, largura: 61, altura: 6, comprimento: 43 },
  { nome: 'Monitor AOC 27" 144Hz', marca: 'AOC', custo: 950, preco: 1399, peso: 4.8, largura: 61, altura: 6, comprimento: 43 },
  { nome: 'SSD Samsung 970 EVO 1TB', marca: 'Samsung', custo: 380, preco: 549, peso: 0.06, largura: 8, altura: 1, comprimento: 2 },
  { nome: 'SSD Kingston NV2 1TB', marca: 'Kingston', custo: 250, preco: 379, peso: 0.06, largura: 8, altura: 1, comprimento: 2 },
  { nome: 'HD Externo Seagate 2TB', marca: 'Seagate', custo: 280, preco: 419, peso: 0.2, largura: 12, altura: 2, comprimento: 8 },
  { nome: 'HD Externo WD My Passport 4TB', marca: 'WD', custo: 420, preco: 599, peso: 0.22, largura: 11, altura: 2, comprimento: 8 },
  { nome: 'Memória RAM Corsair 16GB DDR4', marca: 'Corsair', custo: 220, preco: 329, peso: 0.04, largura: 13, altura: 4, comprimento: 1 },
  { nome: 'Memória RAM Kingston 32GB DDR5', marca: 'Kingston', custo: 480, preco: 699, peso: 0.04, largura: 13, altura: 4, comprimento: 1 },
  { nome: 'Placa de Vídeo RTX 4060', marca: 'NVIDIA', custo: 1800, preco: 2599, peso: 0.8, largura: 24, altura: 5, comprimento: 12 },
  { nome: 'Placa de Vídeo RX 7600', marca: 'AMD', custo: 1600, preco: 2299, peso: 0.75, largura: 22, altura: 5, comprimento: 11 },
  { nome: 'Processador Intel Core i5-13400', marca: 'Intel', custo: 750, preco: 1099, peso: 0.1, largura: 4, altura: 2, comprimento: 4 },
  { nome: 'Processador AMD Ryzen 5 7600X', marca: 'AMD', custo: 850, preco: 1249, peso: 0.1, largura: 4, altura: 2, comprimento: 4 },
  { nome: 'Placa-mãe ASUS TUF B550M', marca: 'ASUS', custo: 680, preco: 999, peso: 0.6, largura: 24, altura: 5, comprimento: 24 },
  { nome: 'Fonte Corsair 650W 80+ Gold', marca: 'Corsair', custo: 380, preco: 549, peso: 1.8, largura: 15, altura: 9, comprimento: 14 },
  { nome: 'Gabinete Cooler Master Q300L', marca: 'Cooler Master', custo: 280, preco: 419, peso: 3.2, largura: 23, altura: 38, comprimento: 37 },
  { nome: 'Cooler CPU Noctua NH-D15', marca: 'Noctua', custo: 380, preco: 549, peso: 1.32, largura: 16, altura: 16, comprimento: 14 },
  { nome: 'Roteador TP-Link Archer AX73', marca: 'TP-Link', custo: 450, preco: 649, peso: 0.55, largura: 26, altura: 5, comprimento: 16 },
  { nome: 'Roteador Mesh TP-Link Deco XE75', marca: 'TP-Link', custo: 1200, preco: 1699, peso: 0.9, largura: 14, altura: 14, comprimento: 14 },
  { nome: 'Switch TP-Link 8 Portas Gigabit', marca: 'TP-Link', custo: 120, preco: 189, peso: 0.3, largura: 16, altura: 3, comprimento: 10 },
  { nome: 'Impressora HP DeskJet 2776', marca: 'HP', custo: 280, preco: 419, peso: 2.4, largura: 43, altura: 15, comprimento: 30 },
  { nome: 'Impressora Epson EcoTank L3250', marca: 'Epson', custo: 680, preco: 999, peso: 3.7, largura: 38, altura: 18, comprimento: 32 },
  { nome: 'Scanner Epson Perfection V39', marca: 'Epson', custo: 350, preco: 499, peso: 1.5, largura: 27, altura: 5, comprimento: 38 },
  { nome: 'Projetor Epson Home Cinema 1080', marca: 'Epson', custo: 2200, preco: 3199, peso: 2.8, largura: 31, altura: 12, comprimento: 25 },
  { nome: 'Caixa de Som JBL Charge 5', marca: 'JBL', custo: 580, preco: 849, peso: 0.96, largura: 22, altura: 10, comprimento: 10 },
  { nome: 'Caixa de Som Sony SRS-XB43', marca: 'Sony', custo: 620, preco: 899, peso: 1.17, largura: 28, altura: 11, comprimento: 11 },
  { nome: 'Soundbar Samsung HW-B450', marca: 'Samsung', custo: 780, preco: 1099, peso: 2.3, largura: 70, altura: 6, comprimento: 9 },
  { nome: 'Controle Xbox Series S/X', marca: 'Microsoft', custo: 350, preco: 499, peso: 0.29, largura: 15, altura: 6, comprimento: 10 },
  { nome: 'Controle PlayStation DualSense', marca: 'Sony', custo: 400, preco: 579, peso: 0.28, largura: 16, altura: 6, comprimento: 10 },
  { nome: 'Headset Gamer HyperX Cloud II', marca: 'HyperX', custo: 380, preco: 549, peso: 0.32, largura: 19, altura: 8, comprimento: 17 },
  { nome: 'Headset Gamer Razer Kraken X', marca: 'Razer', custo: 220, preco: 329, peso: 0.25, largura: 18, altura: 8, comprimento: 16 },
  { nome: 'Microfone USB Blue Yeti', marca: 'Blue', custo: 680, preco: 999, peso: 0.55, largura: 12, altura: 29, comprimento: 12 },
  { nome: 'Microfone HyperX QuadCast S', marca: 'HyperX', custo: 780, preco: 1099, peso: 0.7, largura: 14, altura: 26, comprimento: 14 },
  { nome: 'Carregador Anker 65W GaN', marca: 'Anker', custo: 150, preco: 239, peso: 0.12, largura: 6, altura: 6, comprimento: 3 },
  { nome: 'Carregador Baseus 120W', marca: 'Baseus', custo: 120, preco: 199, peso: 0.1, largura: 5, altura: 5, comprimento: 3 },
  { nome: 'Powerbank Anker 20000mAh', marca: 'Anker', custo: 220, preco: 329, peso: 0.34, largura: 16, altura: 2, comprimento: 8 },
  { nome: 'Cabo USB-C 2m Baseus', marca: 'Baseus', custo: 35, preco: 59, peso: 0.05, largura: 15, altura: 1, comprimento: 3 },
  { nome: 'Hub USB-C 7 em 1 Baseus', marca: 'Baseus', custo: 120, preco: 189, peso: 0.08, largura: 11, altura: 2, comprimento: 4 },
  { nome: 'Suporte para Notebook Multilaser', marca: 'Multilaser', custo: 80, preco: 129, peso: 0.5, largura: 28, altura: 3, comprimento: 22 },
  { nome: 'Pad Mouse Gamer XL Redragon', marca: 'Redragon', custo: 60, preco: 99, peso: 0.35, largura: 90, altura: 1, comprimento: 40 },
  { nome: 'Webcam Logitech C270 HD', marca: 'Logitech', custo: 150, preco: 239, peso: 0.12, largura: 9, altura: 4, comprimento: 7 },
  { nome: 'Pendrive Samsung 128GB USB 3.1', marca: 'Samsung', custo: 80, preco: 129, peso: 0.02, largura: 6, altura: 1, comprimento: 2 },
  { nome: 'Pendrive Kingston 256GB', marca: 'Kingston', custo: 120, preco: 189, peso: 0.02, largura: 6, altura: 1, comprimento: 2 },
  { nome: 'Cartão SD SanDisk 128GB', marca: 'SanDisk', custo: 80, preco: 129, peso: 0.01, largura: 3, altura: 1, comprimento: 2 },
  { nome: 'Leitor de Cartão Anker USB-C', marca: 'Anker', custo: 50, preco: 79, peso: 0.02, largura: 5, altura: 1, comprimento: 3 },
  { nome: 'Adaptador HDMI 4K Baseus', marca: 'Baseus', custo: 40, preco: 69, peso: 0.02, largura: 5, altura: 2, comprimento: 2 },
  { nome: 'Drone DJI Mini 3', marca: 'DJI', custo: 2800, preco: 3999, peso: 0.25, largura: 17, altura: 6, comprimento: 10 },
  { nome: 'Drone Holy Stone HS720E', marca: 'Holy Stone', custo: 680, preco: 999, peso: 0.45, largura: 18, altura: 7, comprimento: 10 },
  { nome: 'Ring Light 18" Greika', marca: 'Greika', custo: 180, preco: 279, peso: 1.8, largura: 50, altura: 5, comprimento: 50 },
  { nome: 'Estabilizador DJI OM 6', marca: 'DJI', custo: 780, preco: 1099, peso: 0.3, largura: 16, altura: 7, comprimento: 5 },
  { nome: 'Fonte No-break APC 600VA', marca: 'APC', custo: 280, preco: 419, peso: 3.4, largura: 24, altura: 11, comprimento: 14 },
  { nome: 'Estabilizador Intelbras XNB 600', marca: 'Intelbras', custo: 120, preco: 189, peso: 1.6, largura: 20, altura: 9, comprimento: 9 },
  { nome: 'Smart Speaker Amazon Echo Dot 5', marca: 'Amazon', custo: 280, preco: 399, peso: 0.3, largura: 10, altura: 9, comprimento: 10 },
  { nome: 'Smart Speaker Google Nest Mini', marca: 'Google', custo: 200, preco: 299, peso: 0.18, largura: 10, altura: 4, comprimento: 10 },
  { nome: 'Chromecast Google TV 4K', marca: 'Google', custo: 280, preco: 399, peso: 0.06, largura: 6, altura: 2, comprimento: 6 },
  { nome: 'Fire TV Stick 4K Amazon', marca: 'Amazon', custo: 220, preco: 329, peso: 0.05, largura: 10, altura: 1, comprimento: 3 },
  { nome: 'Lâmpada Inteligente Positivo', marca: 'Positivo', custo: 45, preco: 79, peso: 0.08, largura: 6, altura: 11, comprimento: 6 },
  { nome: 'Tomada Inteligente Intelbras', marca: 'Intelbras', custo: 60, preco: 99, peso: 0.09, largura: 5, altura: 5, comprimento: 5 },
  { nome: 'Câmera de Segurança Intelbras iM4', marca: 'Intelbras', custo: 180, preco: 279, peso: 0.2, largura: 8, altura: 8, comprimento: 8 },
  { nome: 'Câmera IP TP-Link Tapo C200', marca: 'TP-Link', custo: 150, preco: 239, peso: 0.18, largura: 8, altura: 11, comprimento: 8 },
  { nome: 'GPS Garmin Nüvi 55LM', marca: 'Garmin', custo: 480, preco: 699, peso: 0.17, largura: 13, altura: 8, comprimento: 2 },
  { nome: 'Rastreador Veicular Positivo', marca: 'Positivo', custo: 120, preco: 189, peso: 0.06, largura: 8, altura: 2, comprimento: 5 },
  { nome: 'Fritadeira Elétrica Mondial 4L', marca: 'Mondial', custo: 180, preco: 279, peso: 3.2, largura: 28, altura: 32, comprimento: 32 },
  { nome: 'Chaleira Elétrica Britânia 1.7L', marca: 'Britânia', custo: 80, preco: 129, peso: 0.9, largura: 22, altura: 22, comprimento: 17 },
  { nome: 'Purificador Electrolux PA31G', marca: 'Electrolux', custo: 480, preco: 699, peso: 4.5, largura: 29, altura: 43, comprimento: 22 },
  { nome: 'Ventilador de Mesa Arno VX10', marca: 'Arno', custo: 80, preco: 129, peso: 1.2, largura: 40, altura: 38, comprimento: 15 },
  { nome: 'Cafeteira Nespresso Essenza Mini', marca: 'Nespresso', custo: 480, preco: 699, peso: 2.4, largura: 11, altura: 31, comprimento: 33 },
  { nome: 'Aspirador Robô Xiaomi Mi Robot', marca: 'Xiaomi', custo: 980, preco: 1399, peso: 3.5, largura: 35, altura: 10, comprimento: 35 },
];

async function main() {
  // 🔍 Busca o usuário pelo e-mail
  const usuario = await prisma.user.findUnique({
    where: { email: 'guilerme@email.com' },
  });

  if (!usuario) {
    console.error('❌ Usuário guilerme@email.com não encontrado. Crie a conta antes de rodar o seed.');
    process.exit(1);
  }

  console.log(`✅ Usuário encontrado: ${usuario.nome} (ID: ${usuario.id})`);

  // 🗑️ Remove anúncios anteriores do usuário para evitar duplicatas
  await prisma.anuncio.deleteMany({ where: { userId: usuario.id } });
  console.log('🗑️  Anúncios anteriores removidos.');

  // 🌱 Cria os 100 anúncios
  const anuncios = produtos.map((p, i) => ({
    userId: usuario.id,
    idMercadoLivre: `MLB${100000000 + i}`,
    nome: p.nome,
    marca: p.marca,
    tipoAnuncio: i % 3 === 0 ? 'PREMIUM' : 'CLASSICO', // ~1/3 premium, ~2/3 clássico
    custo: p.custo,
    precoVenda: p.preco,
    frete: 0, // calculado pelo microserviço em tempo real
    largura: p.largura,
    altura: p.altura,
    comprimento: p.comprimento,
    peso: p.peso,
  }));

  await prisma.anuncio.createMany({ data: anuncios });

  console.log(`🌱 ${anuncios.length} anúncios de eletrônicos criados com sucesso!`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });