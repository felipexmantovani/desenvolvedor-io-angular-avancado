import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface AuthConfig extends ModuleConfig {
  keyToken: string;
  keyUser: string;
}

const path = 'auth';

export const AUTH_CONFIG: AuthConfig = {
  name: 'Autenticação',
  namePlural: 'Autenticações',
  path,
  pathFront: `/${path}`,
  keyToken: 'token',
  keyUser: 'user'
};
