import { Fornecedor } from '../modules/fornecedor/models/fornecedor.interface';
import { Produto } from '../modules/produto/models/produto.interface';

export const FORNECEDOR_MOCK: Array<Fornecedor> = [
  {
    ativo: true,
    documento: '21705488000122',
    endereco: {
      bairro: 'Parque Paulista',
      cep: '04850020',
      cidade: 'São Paulo',
      complemento: 'Quadra 1',
      estado: 'SP',
      fornecedorId: '1',
      id: '1',
      logradouro: 'Rua Adélia da Silva Mendes',
      numero: '1020'
    },
    id: '1',
    nome: 'Paulista Atacado',
    produtos: new Array<Produto>(),
    tipoFornecedor: 2
  },
  {
    ativo: false,
    documento: '65029823000195',
    endereco: {
      bairro: 'Sítio Cercado',
      cep: '81935020',
      cidade: 'Curitiba',
      complemento: 'Quadra 2',
      estado: 'PR',
      fornecedorId: '2',
      id: '2',
      logradouro: 'Rua Jardim Olinda',
      numero: '9381'
    },
    id: '2',
    nome: 'Cercado Representações',
    produtos: new Array<Produto>(),
    tipoFornecedor: 2
  },
  {
    ativo: true,
    documento: '86857583000197',
    endereco: {
      bairro: 'Centro',
      cep: '87580970',
      cidade: 'Alto Piquiri',
      complemento: 'Quadra 3',
      estado: 'PR',
      fornecedorId: '3',
      id: '3',
      logradouro: 'Avenida Brasil',
      numero: '1802'
    },
    id: '3',
    nome: 'Piquiri Atacado',
    produtos: new Array<Produto>(),
    tipoFornecedor: 2
  },
  {
    ativo: true,
    documento: '52625286008',
    endereco: {
      bairro: 'Itaum',
      cep: '89210050',
      cidade: 'Joinville',
      complemento: 'Quadra 3',
      estado: 'SC',
      fornecedorId: '4',
      id: '4',
      logradouro: 'Rua Botafogo',
      numero: '4232'
    },
    id: '4',
    nome: 'Mário Batista de Souza',
    produtos: new Array<Produto>(),
    tipoFornecedor: 1
  },
  {
    ativo: false,
    documento: '91149575077',
    endereco: {
      bairro: 'Centro',
      cep: '36152973',
      cidade: 'Goianá',
      complemento: 'complemento',
      estado: 'MG',
      fornecedorId: '5',
      id: '5',
      logradouro: 'Praça Ambire de Paula Andrade',
      numero: '1938'
    },
    id: '5',
    nome: 'João Carlos dos Santos',
    produtos: new Array<Produto>(),
    tipoFornecedor: 1
  }
];
