import { Fornecedor } from '../../support/fornecedor/fornecedor.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';
import { Sidebar } from '../../support/_shared/interfaces/sidebar.interface';
import { Table } from '../../support/_shared/interfaces/table.interface';
import { CpfCnpjGenerate } from '../../support/_shared/util/cnpj-cnpj-generate';
import { DateUtil } from '../../support/_shared/util/date.util';

describe('fornecedor-e2e.spec', () => {

  let fixturePage: Page;
  let fixtureSidebar: Sidebar;
  let fixtureTable: Table;
  let fixtureFornecedor: Fornecedor;

  const fornecedorNomePF = `Fornecedor PF ${DateUtil.getTime()}`;
  const fornecedorNomeAlteradoPF = `Fornecedor PF ${DateUtil.getTime()} Alterado`;

  const fornecedorNomePJ = `Fornecedor PJ ${DateUtil.getTime()}`;
  const fornecedorNomeAlteradoPJ = `Fornecedor PJ ${DateUtil.getTime()} Alterado`;

  const cpf = CpfCnpjGenerate.cpfValido();
  const cnpj = CpfCnpjGenerate.cnpjValido();

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/_shared/sidebar').then(fixture => fixtureSidebar = fixture);
    cy.fixture('./../fixtures/_shared/table').then(fixture => fixtureTable = fixture);
    cy.fixture('./../fixtures/fornecedor/fornecedor').then(fixture => fixtureFornecedor = fixture);
  });

  it('Deve listar os fornecedores cadastrados', () => {
    // Ir para home
    cy.navigateHome()

    // Ir para listagem de fornecedores
    .get(fixtureSidebar.menu.nav.fornecedores)
    .click()
    .get(fixturePage.title)
    .should(($title) => expect($title[0].textContent).to.contains('Fornecedores'))
    .get(fixtureTable.table)
    .should('be.visible');
  });

  it('Deve fazer o login e cadastrar um fornecedor PF e outro PJ', () => {
    // Faz login com usuário padrão
    cy.get(fixtureSidebar.access.btnEntrar)
    .click()
    .url()
    .should('contain', '/auth/login')
    .login()

    // Acessa página de listagem de fornecedores
    .get(fixtureSidebar.menu.nav.fornecedores)
    .click()
    .url()
    .should('contain', '/fornecedor')
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(2);
      expect(($breadcrumb[0])).to.contain('Home');
      expect(($breadcrumb[1])).to.contain('Fornecedores');
    })

    // Acessa página de cadastro de fornecedor
    .get(fixtureFornecedor.btnNovo)
    .click()
    .url()
    .should('contain', '/fornecedor/novo')
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(3);
      expect(($breadcrumb[0])).to.contain('Home');
      expect(($breadcrumb[1])).to.contain('Fornecedores');
      expect(($breadcrumb[2])).to.contain('Novo Fornecedor');
    })
    .get(fixturePage.title)
    .should(($title) => expect($title[0].textContent).to.contains('Novo Fornecedor'))

    // Preenche formulário de PF
    .get(fixtureFornecedor.form.dados.tipoFornecedor.pessoaFisica)
    .click()
    .get(fixtureFornecedor.form.dados.nome)
    .type(fornecedorNomePF)
    .get(fixtureFornecedor.form.dados.documento)
    .type(cpf)
    .get(fixtureFornecedor.form.dados.ativo)
    .click()
    .get(fixtureFornecedor.form.endereco.cep)
    .type('87580000')
    .get(fixtureFornecedor.form.endereco.logradouro)
    .focus()
    .wait(2000)
    .type('Rua Rui Rodrigues Maia')
    .get(fixtureFornecedor.form.endereco.numero)
    .type('41')
    .get(fixtureFornecedor.form.endereco.complemento)
    .type('Casa')
    .get(fixtureFornecedor.form.endereco.bairro)
    .type('Centro')

    // Cadastra fornecedor e redireciona para listagem
    .get(fixtureFornecedor.form.btnSalvar)
    .click()
    .toastCheck('po-toaster-success', `Fornecedor ${fornecedorNomePF} cadastrado com sucesso.`)
    .url()
    .should('contain', '/fornecedor')
    .wait(1000)

    // Pesquisa fornecedor cadastrado, deve contar apenas um registro na listagem da table
    .get(fixturePage.search.input)
    .type(fornecedorNomePF)
    .get(fixturePage.search.btnLupa)
    .click()
    .get(fixtureTable.rows)
    .should($rows => expect($rows.length).to.equal(1))

    // Acessa página de cadastro de fornecedor
    .get(fixtureFornecedor.btnNovo)
    .click()
    .url()
    .should('contain', '/fornecedor/novo')
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(3);
      expect(($breadcrumb[0])).to.contain('Home');
      expect(($breadcrumb[1])).to.contain('Fornecedores');
      expect(($breadcrumb[2])).to.contain('Novo Fornecedor');
    })
    .get(fixturePage.title)
    .should(($title) => expect($title[0].textContent).to.contains('Novo Fornecedor'))

    // Preenche formulário de PJ
    .get(fixtureFornecedor.form.dados.tipoFornecedor.pessoaJuridica)
    .click()
    .get(fixtureFornecedor.form.dados.nome)
    .type(fornecedorNomePJ)
    .get(fixtureFornecedor.form.dados.documento)
    .type(cnpj)
    .get(fixtureFornecedor.form.dados.ativo)
    .click()
    .get(fixtureFornecedor.form.endereco.cep)
    .type('87580000')
    .get(fixtureFornecedor.form.endereco.logradouro)
    .focus()
    .wait(2000)
    .type('Rua Rui Rodrigues Maia')
    .get(fixtureFornecedor.form.endereco.numero)
    .type('41')
    .get(fixtureFornecedor.form.endereco.complemento)
    .type('Casa')
    .get(fixtureFornecedor.form.endereco.bairro)
    .type('Centro')

    // Cadastra fornecedor e redireciona para listagem
    .get(fixtureFornecedor.form.btnSalvar)
    .click()
    .toastCheck('po-toaster-success', `Fornecedor ${fornecedorNomePJ} cadastrado com sucesso.`)
    .url()
    .should('contain', '/fornecedor')
    .wait(1000)

    // Pesquisa fornecedor cadastrado, deve contar apenas um registro na listagem da table
    .get(fixturePage.search.input)
    .type(fornecedorNomePJ)
    .get(fixturePage.search.btnLupa)
    .click()
    .get(fixtureTable.rows)
    .should($rows => expect($rows.length).to.equal(1));
  });

  it('Deve editar o último fornecedor PF cadastrado', () => {
    // Pesquisa fornecedor
    cy.get(fixturePage.search.input)
    .clear()
    .type(fornecedorNomePF)
    .get(fixturePage.search.btnLupa)
    .click()
    .get(fixtureTable.rows)
    .should($rows => expect($rows.length).to.equal(1))
    .get(fixtureFornecedor.table.acoesPrimeiroRegistro)
    .should($acoes => $acoes[0].click())

    // Navega para a página de detalhes
    .get(fixtureFornecedor.table.acaoDetalhes)
    .click()
    .url()
    .should('contain', '/fornecedor/detalhe/')
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(3);
      expect(($breadcrumb[0])).to.contain('Home');
      expect(($breadcrumb[1])).to.contain('Fornecedores');
      expect(($breadcrumb[2])).to.contain(fornecedorNomePF);
    })
    .get(fixturePage.title)
    .should('contain', fornecedorNomePF)

    // Abre google maps no modal
    .get(fixtureFornecedor.form.endereco.verMapa)
    .click()
    .get(fixtureFornecedor.form.endereco.iframe)
    .should('be.visible')
    .wait(5000)
    .get(fixtureFornecedor.form.endereco.fecharMapa)
    .click()

    // Altera nome do fornecedor e salva
    .get(fixtureFornecedor.form.dados.nome)
    .clear()
    .type(fornecedorNomeAlteradoPF)
    .get(fixtureFornecedor.form.btnSalvar)
    .click()
    .toastCheck('po-toaster-success', `Fornecedor ${fornecedorNomeAlteradoPF} salvo com sucesso.`)
    .url()
    .should('contain', '/fornecedor')
    .wait(1000)

    // Faz pesquisa pelo fornecedor cadastrado, deve conter apenas um registro na table
    .get(fixturePage.search.input)
    .type(fornecedorNomeAlteradoPF)
    .get(fixturePage.search.btnLupa)
    .click()
    .get(fixtureTable.rows)
    .should($rows => expect($rows.length).to.equal(1))
    .logout();
  });

});
