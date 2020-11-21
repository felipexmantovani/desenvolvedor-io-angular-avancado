import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

const path = 'usuario';

export const USUARIO_CONFIG: ModuleConfig = {
  name: 'Usuário',
  namePlural: 'Usuários',
  path,
  pathFront: `/${path}`
}
