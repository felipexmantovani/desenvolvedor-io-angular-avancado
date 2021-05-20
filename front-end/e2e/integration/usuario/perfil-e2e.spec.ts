import { LOGIN_CONFIG } from '../../support/auth/login.config';
import { Perfil } from '../../support/usuario/perfil.interface';
import { Page } from '../../support/_shared/interfaces/page.interface';
import { Sidebar } from '../../support/_shared/interfaces/sidebar.interface';

describe('perfil-e2e.spec', () => {

  let fixturePage: Page;
  let fixtureSidebar: Sidebar;
  let fixturePerfil: Perfil;

  beforeEach(() => {
    cy.fixture('./../fixtures/_shared/page').then(fixture => fixturePage = fixture);
    cy.fixture('./../fixtures/_shared/sidebar').then(fixture => fixtureSidebar = fixture);
    cy.fixture('./../fixtures/usuario/perfil').then(fixture => fixturePerfil = fixture);
  });

  it('Deve verificar se os dados do perfil do usuário "teste" estão corretos', () => {
    // Ir para home
    cy.navigateHome()

    // Tenta ir para página de perfil mas é redirecionado para home pois usuário "teste" não está logado
    .get(fixtureSidebar.access.avatar)
    .click()
    .url()
    .should('include', '/auth/login')
    .toastCheck('po-toaster-warning', 'Para acessar essa página é necessário fazer o login.')

    // Faz login com usuário "teste" e redireciona para a página de perfil
    .login()
    .url()
    .should('include', '/usuario/perfil')

    // Verifica card do ID
    .get(fixturePerfil.id)
    .should('contain', '24ca00c0-975b-46d8-967d-b4ee8add5a44')

    // Verifica card do EMAIL
    .get(fixturePerfil.email)
    .should('contain', LOGIN_CONFIG.email)

    // Verifica card das CLAIMS
    .get(fixturePerfil.claims.email)
    .should('contain', LOGIN_CONFIG.email)
    .get(fixturePerfil.claims.fornecedor)
    .should('contain', 'Adicionar,Atualizar,Excluir')
    .get(fixturePerfil.claims.iat)
    .should('be.visible')
    .get(fixturePerfil.claims.jti)
    .should('be.visible')
    .get(fixturePerfil.claims.nbf)
    .should('be.visible')
    .get(fixturePerfil.claims.produto)
    .should('contain', 'Adicionar,Atualizar,Excluir')
    .get(fixturePerfil.claims.sub)
    .should('be.visible')
  });

});
