import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const path = 'produto';

export const PRODUTO_CONFIG: ModuleConfig = {
  name: 'Produto',
  namePlural: 'Produtos',
  path,
  pathFront: `/${path}`,
};
