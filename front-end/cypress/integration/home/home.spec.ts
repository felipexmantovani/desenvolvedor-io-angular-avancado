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

    // Exibe corremente mensagem de boas vindas
    .get(fixture.mensagemBoasVindas)
    .should(($mensagem) => {
      expect($mensagem.first()).to.contain('Olá, seja bem-vindo(a)!');
    })

    // Exibe apenas o card dos fornecedores pois usuário está deslogado
    .get(fixture.cards)
    .should(($cards) => {
      expect(($cards.length)).to.equal(1);
      expect(($cards.first()).children()).to.contain('Fornecedores');
    });
  });

});
