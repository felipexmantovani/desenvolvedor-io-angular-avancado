import { Produto } from '../../src/app/modules/produto/models/produto.interface';

export const collectionName = 'produtos';

export const PRODUTO_MOCK: Array<Produto> = [
  {
    id: 'cce7be65-5489-46aa-2fb4-08d6d7fc893a',
    fornecedorId: 'cef33216-e53e-41d9-4d46-08d6cdc617a1',
    nome: 'CSS Total',
    descricao: 'CSS Total ',
    imagemUpload: null,
    imagem: '1e723e03-a406-442b-b2c8-f4c561681379_CSS.jpg',
    valor: 12.0,
    dataCadastro: '2019-05-13T21:17:31.1770832',
    ativo: true,
    nomeFornecedor: 'Amazon Books',
  },
  {
    id: '1a3fbec5-4dc3-4455-2fb5-08d6d7fc893a',
    fornecedorId: 'b582a621-472d-403a-46af-08d6ce6e5165',
    nome: 'HTML 5',
    descricao: 'HTML 5',
    imagemUpload: null,
    imagem: '734ed7ec-23c7-4b6a-80ea-9cbf445a6729_HTML.jpg',
    valor: 10.0,
    dataCadastro: '2019-05-13T21:42:32.2754874',
    ativo: true,
    nomeFornecedor: 'SeboTech',
  },
  {
    id: '74db5a66-3967-4547-4879-08d7eebb64b7',
    fornecedorId: 'cef33216-e53e-41d9-4d46-08d6cdc617a1',
    nome: 'Java para Seniors',
    descricao: 'Java para Seniors',
    imagemUpload: null,
    imagem: '2994c744-02d5-4b4a-98d1-e04ae8709e5c_Java.jpg',
    valor: 250.0,
    dataCadastro: '2020-05-02T14:08:11.2285147',
    ativo: false,
    nomeFornecedor: 'Amazon Books',
  },
  {
    id: '912ac3e8-8ca0-4708-f520-08d6d7f166aa',
    fornecedorId: '02138343-6d88-47b7-4d45-08d6cdc617a1',
    nome: 'JavaScript nas fronteiras',
    descricao: 'JavaScript nas fronteiras',
    imagemUpload: null,
    imagem: '1dbbd291-279f-4743-a781-0c92a482bc2b_JQuery.jpg',
    valor: 1.0,
    dataCadastro: '2019-05-13T19:26:39.0085034',
    ativo: true,
    nomeFornecedor: 'Livros Nerds',
  },
  {
    id: 'ea472496-6d53-4744-4b47-08d6d7f4eeba',
    fornecedorId: 'f25952fc-3ff3-4b52-4d47-08d6cdc617a1',
    nome: 'MVC 5',
    descricao: 'MVC 5',
    imagemUpload: null,
    imagem: '9e2b29e2-f7e6-4fbf-8696-761ebd462f47_MVC5.jpg',
    valor: 122.0,
    dataCadastro: '2019-05-13T19:47:09.7866487',
    ativo: true,
    nomeFornecedor: 'Eduardo Pires Livros',
  },
  {
    id: '0f1a7ed3-091d-457f-2fb3-08d6d7fc893a',
    fornecedorId: '02138343-6d88-47b7-4d45-08d6cdc617a1',
    nome: 'Razor Completo',
    descricao: 'Razor Completo',
    imagemUpload: null,
    imagem: 'cc0a711a-a172-48a1-ab69-b074b572321b_Razor.jpg',
    valor: 125.0,
    dataCadastro: '2019-05-13T20:41:35.4087087',
    ativo: false,
    nomeFornecedor: 'Livros Nerds',
  },
  {
    id: '1067326c-5dd4-4d86-d14c-08d6d7f28ecc',
    fornecedorId: 'b582a621-472d-403a-46af-08d6ce6e5165',
    nome: 'Regex fácil!',
    descricao: 'Regex fácil!',
    imagemUpload: null,
    imagem: '4677e4a2-c57e-42f9-8cef-7ea55aa92c33_Regex.jpg',
    valor: 500.0,
    dataCadastro: '2019-05-13T19:30:09.7901809',
    ativo: true,
    nomeFornecedor: 'SeboTech',
  }
];
