import { LOGIN_CONFIG } from '../../support/auth/login.config';
import { UsuarioNovo } from '../../support/usuario/usuario-novo.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';
import { Sidebar } from '../../support/_shared/interfaces/sidebar.interface';
import { DateUtil } from '../../support/_shared/util/date.util';

describe('usuario-novo-e2e.spec', () => {

  let fixturePage: Page;
  let fixtureSidebar: Sidebar;
  let fixtureUsuarioNovo: UsuarioNovo;

  const emailUser = `cy_${DateUtil.getTime()}@email.com`;

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/_shared/sidebar').then(fixture => fixtureSidebar = fixture);
    cy.fixture('./../fixtures/usuario/usuario-novo').then(fixture => fixtureUsuarioNovo = fixture);
  });

  it('Deve cadastrar um novo usuário e realizar o login', () => {
    // Ir para home
    cy.navigateHome()

    // Ir para página de cadastro
    .get(fixtureSidebar.access.btnCriarConta)
    .click()
    .url()
    .should('include', '/usuario/novo')

    // Exibe corretamente o breadcrumb da página
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(2);
      expect(($breadcrumb[0])).to.contain('Home');
      expect(($breadcrumb[1])).to.contain('Novo Usuário');
    })

    // Exibe corremente o título da página
    .get(fixturePage.title)
    .should(($title) => expect($title[0]).to.contain('Novo Usuário'))

    // Exibe a imagem
    .get(fixtureUsuarioNovo.image)
    .should('be.visible')
    .and(($img) => expect($img[0]).attr('src').to.equal('./assets/nova-conta.png'))

    // Mostra toaster de error quando submeter formulário estando inválido
    .get(fixtureUsuarioNovo.form.btnSubmit)
    .click()
    .toastCheck('po-toaster-error', 'Verifique o formulário.')

    // Valida se senha cumpre as regras de senha forte
    .get(fixtureUsuarioNovo.form.password)
    .type('senhaFraca')
    .get(fixtureUsuarioNovo.form.passwordMsgErro)
    .should('be.visible')
    .wait(1000)
    .get(fixtureUsuarioNovo.form.password)
    .clear()

    // Mostra toaster de error quando submeter formulário com senhas diferentes
    .get(fixtureUsuarioNovo.form.email)
    .type(emailUser)
    .get(fixtureUsuarioNovo.form.password)
    .type(LOGIN_CONFIG.password)
    .get(fixtureUsuarioNovo.form.confirmPassword)
    .type('Diferente@123')
    .get(fixtureUsuarioNovo.form.btnSubmit)
    .click()
    .toastCheck('po-toaster-error', 'As senhas devem ser iguais.')

    // Informa a senha novamente e cria novo usuário
    .get(fixtureUsuarioNovo.form.password)
    .clear()
    .type(LOGIN_CONFIG.password)
    .get(fixtureUsuarioNovo.form.confirmPassword)
    .clear()
    .type(LOGIN_CONFIG.password)
    .get(fixtureUsuarioNovo.form.btnSubmit)
    .click()

    // Navega para tela de login e exibe toaster de sucesso
    .url()
    .should('include', '/auth/login')
    .toastCheck('po-toaster-success', `${emailUser} cadastrado com sucesso.`)

    // Faz login com usuário criado e logo após faz logout
    .login(emailUser, LOGIN_CONFIG.password)
    .url()
    .should('include', '/home')
    .logout();
  });

});
