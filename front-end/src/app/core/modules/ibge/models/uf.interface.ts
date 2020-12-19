import { IbgeRegiao } from './regiao.interface';

export interface IbgeUf {
  id: number;
  nome: string;
  sigla: string;
  regiao: IbgeRegiao;
}
