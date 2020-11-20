import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const path = 'page';

export const PAGE_CONFIG: ModuleConfig = {
  name: 'Página',
  namePlural: 'Páginas',
  path,
  pathFront: `/${path}`
}
