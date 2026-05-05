class Anuncio {
  constructor(id, idMercadoLivre, nome, marca, custo, precoVenda, frete) {
    this.id = id
    this.idMercadoLivre = idMercadoLivre
    this.nome = nome
    this.marca = marca
    this.custo = custo
    this.precoVenda = precoVenda
    this.frete = frete
  }
}

module.exports = Anuncio