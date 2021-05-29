export interface Fornecedor {
  btnNovo: string;
  table: {
    acoesPrimeiroRegistro: string;
    acaoDetalhes: string;
    acaoExcluir: string;
  }
  form: {
    dados: {
      tipoFornecedor: {
        pessoaFisica: string;
        pessoaJuridica: string;
      };
      nome: string;
      documento: string;
      ativo: string;
    },
    endereco: {
      verMapa: string;
      iframe: string;
      cep: string;
      logradouro: string;
      numero: string;
      complemento: string;
      bairro: string;
      estado: string;
      cidade: string;
    },
    btnCancelar: string;
    btnSalvar: string;
  }
}
