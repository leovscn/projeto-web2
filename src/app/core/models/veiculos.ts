export interface VeiculoDTO {
  id: number;
  marca: string;
  modelo: string;
  categoria: CategoriaDTO;
  ano: number;
  cor: string;
  placa: string;
  preco: number;
  imagem: string;
}

export interface CategoriaDTO {
  id: number;
  nome: string;
}
