export interface FreteRequest {
  precoVenda: number;
  largura: number;
  altura: number;
  comprimento: number;
  peso: number;
}

export interface FreteResponse {
  frete: number;
  pesoUtilizado: number;
}