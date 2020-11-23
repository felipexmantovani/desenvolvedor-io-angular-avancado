import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface AuthConfig extends ModuleConfig {
  keyToken: string;
}

const path = 'auth';

export const AUTH_CONFIG: AuthConfig = {
  name: 'Autenticação',
  namePlural: 'Autenticações',
  path,
  keyToken: 'token'
};
