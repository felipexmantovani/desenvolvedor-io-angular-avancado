import { Login } from '../../support/auth/login.interface';
import { UsuarioNovo } from '../../support/usuario/usuario-novo.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';
import { Sidebar } from '../../support/_shared/interfaces/sidebar.interface';
import { DateUtil } from '../../support/_shared/util/date.util';

describe('usuario-novo-e2e.spec', () => {

  let fixturePage: Page;

  let fixtureSidebar: Sidebar;

  let fixtureUsuarioNovo: UsuarioNovo;

  let fixtureLogin: Login;

  const emailUser = `cy_${DateUtil.getTime()}@email.com`;

  const passwordDefault = 'Teste@123';

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/_shared/sidebar').then(fixture => fixtureSidebar = fixture);
    cy.fixture('./../fixtures/usuario/usuario-novo').then(fixture => fixtureUsuarioNovo = fixture);
    cy.fixture('./../fixtures/auth/login').then(fixture => fixtureLogin = fixture);
  });

  it('Deve cadastrar um novo usuário e realizar o login', () => {
    // Ir para home
    cy.visit('/')
    .url()
    .should('include', '/home')

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
    .get(fixturePage.toaster.element)
    .should('be.visible')
    .should($element => expect($element.attr('class')).to.contain('po-toaster-error'))
    .get(fixturePage.toaster.msg)
    .should('contain', 'Verifique o formulário.')
    .wait(2000)
    .get(fixturePage.toaster.btnClose)
    .click()

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
    .type(passwordDefault)
    .get(fixtureUsuarioNovo.form.passwordConfirm)
    .type('Diferente@123')
    .get(fixtureUsuarioNovo.form.btnSubmit)
    .click()
    .get(fixturePage.toaster.element)
    .should('be.visible')
    .should($element => expect($element.attr('class')).to.contain('po-toaster-error'))
    .get(fixturePage.toaster.msg)
    .should('contain', 'As senhas devem ser iguais.')
    .wait(2000)
    .get(fixturePage.toaster.btnClose)
    .click()

    // Informa a senha novamente e cria novo usuário
    .get(fixtureUsuarioNovo.form.password)
    .clear()
    .type(passwordDefault)
    .get(fixtureUsuarioNovo.form.passwordConfirm)
    .clear()
    .type(passwordDefault)
    .get(fixtureUsuarioNovo.form.btnSubmit)
    .click()

    // Navega para tela de login e exibe toaster de sucesso
    .url()
    .should('include', '/auth/login')
    .get(fixturePage.toaster.element)
    .should('be.visible')
    .should($element => expect($element.attr('class')).to.contain('po-toaster-success'))
    .get(fixturePage.toaster.msg)
    .should('contain', `${emailUser} cadastrado com sucesso.`)
    .wait(2000)
    .get(fixturePage.toaster.element)
    .click()

    // Faz login com usuário criado, navega para home e faz logout
    .get(fixtureLogin.form.email)
    .type(emailUser)
    .get(fixtureLogin.form.password)
    .type(passwordDefault)
    .get(fixtureLogin.form.btnSubmit)
    .click()
    .get(fixturePage.toaster.element)
    .should('be.visible')
    .should($element => expect($element.attr('class')).to.contain('po-toaster-success'))
    .get(fixturePage.toaster.msg)
    .should('contain', 'Olá, seja bem-vindo(a).')
    .wait(2000)
    .get(fixturePage.toaster.element)
    .click()
    .url()
    .should('include', '/home')
    .get(fixtureSidebar.access.btnSair)
    .click()
    .wait(2000)
    .get(fixtureSidebar.access.modalConfirmLogout)
    .click();
  });

});
