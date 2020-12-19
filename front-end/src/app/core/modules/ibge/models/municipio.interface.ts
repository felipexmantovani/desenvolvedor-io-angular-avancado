import { IbgeMicrorregiao } from './microrregiao.interface';
import { IbgeRegiaoImediata } from './regiao-imediata.interface';

export interface IbgeMunicipio {
  id: number;
  nome: string;
  microrregiao: IbgeMicrorregiao;
  regiaoImediata: IbgeRegiaoImediata;
}
