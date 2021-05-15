/// <reference types="cypress" />

import { Home } from '../../support/home/home.interface';

describe('home.spec', () => {

  let fixture: Home;

  beforeEach(() => {
    cy.fixture('./../fixtures/home/home').then(fixtureRes => fixture = fixtureRes);
  });

  it('Deve navegar para home da aplicação', () => {
    // Ir para home
    cy.visit('/')
    .location('href')
    .should('contain', '/home')

    // Exibe corretamente o breadcrumb da página
    .get(fixture.page.breadcrumb)
    .should(($breadcrumb) => {
      expect(($breadcrumb.length)).equal(1);
      expect(($breadcrumb[0])).to.contain('Home');
    })

    // Exibe corremente o título da página
    .get(fixture.page.title)
    .should(($title) => {
      expect($title[0]).to.contain('Olá, seja bem-vindo(a)!');
    })

    // Exibe apenas o card dos fornecedores pois usuário está deslogado
    .get(fixture.cards)
    .should(($cards) => {
      expect(($cards.length)).to.equal(1);
      expect(($cards[0])).to.contain('Fornecedores');
    });
  });

});
