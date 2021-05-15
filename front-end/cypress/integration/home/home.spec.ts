/// <reference types="cypress" />

import { Home } from '../../support/home/home.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';

describe('home.spec', () => {

  let fixturePage: Page;

  let fixtureHome: Home;

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/home/home').then(fixture => fixtureHome = fixture);
  });

  it('Deve criar a página corretamente', () => {
    // Ir para home
    cy.visit('/')
    .url()
    .should('include', '/home')

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
    .get(fixtureHome.cards)
    .should(($cards) => {
      expect(($cards.length)).to.equal(1);
      expect(($cards[0])).to.contain('Fornecedores');
    });
  });

});
