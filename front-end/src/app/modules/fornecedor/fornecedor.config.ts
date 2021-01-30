import { ModuleConfig } from '../../shared/interfaces/module-config.interface';

interface FornecedorConfig extends ModuleConfig {
  pathApiEndereco: string;
}

const path = 'fornecedor';

export const FORNECEDOR_CONFIG: FornecedorConfig = {
  name: 'Fornecedor',
  namePlural: 'Fornecedores',
  path,
  pathApi: '/fornecedores',
  pathFront: `/${path}`,
  pathApiEndereco: '/fornecedores/endereco'
};
