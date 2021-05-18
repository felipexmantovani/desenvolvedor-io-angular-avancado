declare global {
  namespace Cypress {
    interface Chainable {
      login(email?: string, password?: string): Chainable;
      logout(): Chainable;
    }
  }
}

import { Login } from './auth/login.interface';
import { Page } from './_shared/interfaces/page.interface';
import { Sidebar } from './_shared/interfaces/sidebar.interface';

let fixturePage: Page;
let fixtureSidebar: Sidebar;
let fixtureLogin: Login;

beforeEach(() => {
  cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
  cy.fixture('./../fixtures/_shared/sidebar').then(fixture => fixtureSidebar = fixture);
  cy.fixture('./../fixtures/auth/login').then(fixture => fixtureLogin = fixture);
});

Cypress.Commands.add('login', (email, password) => {
  if (email && password) {
    cy.get(fixtureLogin.form.email)
      .type(email)
      .get(fixtureLogin.form.password)
      .type(password);
  } else {
    cy.get(fixtureLogin.form.email)
      .type(fixtureLogin.loginDefault.email)
      .get(fixtureLogin.form.password)
      .type(fixtureLogin.loginDefault.password);
  }
  cy.get(fixtureLogin.form.btnSubmit)
    .click().get(fixturePage.toaster.element)
    .should('be.visible')
    .should($element => expect($element.attr('class')).to.contain('po-toaster-success'))
    .get(fixturePage.toaster.msg)
    .should('contain', 'Olá, seja bem-vindo(a).')
    .wait(1000)
    .get(fixturePage.toaster.element)
    .click();
});

Cypress.Commands.add('logout', () => {
  cy.get(fixtureSidebar.access.btnSair)
    .click()
    .wait(1000)
    .get(fixtureSidebar.access.modalConfirmLogout)
    .click();
});
