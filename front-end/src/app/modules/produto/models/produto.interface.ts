export interface Produto {
  id: string;
  fornecedorId: string;
  nome: string;
  descricao: string;
  imagemUpload: string;
  imagem: string;
  valor: number;
  dataCadastro: string;
  ativo: boolean;
  nomeFornecedor: string;
}
