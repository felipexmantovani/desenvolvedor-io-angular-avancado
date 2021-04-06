import { environment } from '../../../environments/environment';
import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface ProdutoConfig extends ModuleConfig {
  pathImages: string;
}

const path = 'produto';

export const PRODUTO_CONFIG: ProdutoConfig = {
  name: 'Produto',
  namePlural: 'Produtos',
  path,
  pathApi: '/produtos',
  pathFront: `/${path}`,
  pathImages: environment.images
};
