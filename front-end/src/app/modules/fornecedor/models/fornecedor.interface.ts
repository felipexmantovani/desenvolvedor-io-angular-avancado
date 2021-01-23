import { Produto } from '../../produto/models/produto.interface';
import { FornecedorEndereco } from './fornecedor-endereco.interface';

export interface Fornecedor {
  id: string;
  nome: string;
  documento: string;
  tipoFornecedor: number;
  endereco: FornecedorEndereco;
  ativo: boolean;
  produtos: Array<Produto>;
}
