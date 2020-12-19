import { IbgeMesorregiao } from './mesorregiao.interface';

export interface IbgeMicrorregiao {
  id: number;
  nome: string;
  mesorregiao: IbgeMesorregiao;
}
