import { IbgeUf } from '../shared/modules/ibge/models/uf.interface';

export const IBGE_UF_MOCK: Array<IbgeUf> = [
  {
    id: 1,
    nome: 'Nome',
    regiao: {
      id: 1,
      nome: 'Nome',
      sigla: 'PR'
    },
    sigla: 'PR'
  },
  {
    id: 2,
    nome: 'Nome',
    regiao: {
      id: 2,
      nome: 'Nome',
      sigla: 'SC'
    },
    sigla: 'SC'
  },
  {
    id: 3,
    nome: 'Nome',
    regiao: {
      id: 3,
      nome: 'Nome',
      sigla: 'SP'
    },
    sigla: 'SP'
  },
];
