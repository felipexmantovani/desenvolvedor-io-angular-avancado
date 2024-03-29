import { Home } from '../../support/home/home.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';

describe('home-e2e.spec', () => {

  let fixturePage: Page;
  let fixtureHome: Home;

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/home/home').then(fixture => fixtureHome = fixture);
  });

  it('Deve montar a página corretamente', () => {
    // Ir para home
    cy.navigateHome()

    // Exibe corretamente o breadcrumb da página
    .get(fixturePage.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(1);
      expect(($breadcrumb[0])).to.contain('Home');
    })

    // Exibe corremente o título da página
    .get(fixturePage.title)
    .should(($title) => {
      expect($title[0]).to.contain('Olá, seja bem-vindo(a)!');
    })

    // Exibe apenas o card dos fornecedores pois usuário está deslogado
    .get(fixtureHome.fornecedores)
    .should('exist')
    .get(fixtureHome.produtos)
    .should('not.exist');
  });

});
