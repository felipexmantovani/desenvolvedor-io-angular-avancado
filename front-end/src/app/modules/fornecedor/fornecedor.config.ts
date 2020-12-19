import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const path = 'fornecedor';

export const FORNECEDOR_CONFIG: ModuleConfig = {
  name: 'Fornecedor',
  namePlural: 'Fornecedores',
  path,
  pathApi: '/fornecedores',
  pathFront: `/${path}`
};
