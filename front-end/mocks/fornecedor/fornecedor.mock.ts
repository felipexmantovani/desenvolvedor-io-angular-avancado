import { Fornecedor } from '../../src/app/modules/fornecedor/models/fornecedor.interface';
import { Produto } from '../../src/app/modules/produto/models/produto.interface';

export const collectionName = 'fornecedores';

export const FORNECEDOR_MOCK: Array<Fornecedor> = [
  {
    ativo: true,
    documento: '80102499047',
    endereco: {
      bairro: 'Parque Paulista',
      cep: '04850020',
      cidade: 3550308,
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
    tipoFornecedor: 1
  },
  {
    ativo: false,
    documento: '60786427000199',
    endereco: {
      bairro: 'Sítio Cercado',
      cep: '81935020',
      cidade: 4106902,
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
    documento: '10404343000175',
    endereco: {
      bairro: 'Centro',
      cep: '87580970',
      cidade: 4100707,
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
    documento: '54491318018',
    endereco: {
      bairro: 'Itaum',
      cep: '89210050',
      cidade: 4209102,
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
    documento: '22337689069',
    endereco: {
      bairro: 'Centro',
      cep: '36152973',
      cidade: 3127388,
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
