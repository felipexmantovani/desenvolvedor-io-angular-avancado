import { IbgeRegiaoIntermediaria } from './regiao-intermediaria.interface';

export interface IbgeRegiaoImediata {
  id: number;
  nome: string;
  regiaoIntermediaria: IbgeRegiaoIntermediaria;
}
