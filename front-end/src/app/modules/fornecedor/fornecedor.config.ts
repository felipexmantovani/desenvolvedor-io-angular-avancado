import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const path = 'fornecedor';

export const FORNECEDORES_CONFIG: ModuleConfig = {
  name: 'Fornecedor',
  namePlural: 'Fornecedores',
  path,
  pathFront: `/${path}`
}
