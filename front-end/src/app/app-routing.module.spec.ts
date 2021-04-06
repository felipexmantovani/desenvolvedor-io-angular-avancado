import { Location } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from './app-routing.module';
import { FORNECEDOR_MOCK } from './mocks/fornecedor.mock';
import { PRODUTO_MOCK } from './mocks/produto.mock';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { AuthService } from './modules/auth/services/auth.service';
import { FORNECEDOR_CONFIG } from './modules/fornecedor/fornecedor.config';
import { FornecedorReadResolver } from './modules/fornecedor/resolvers/fornecedor-read.resolver';
import { PRODUTO_CONFIG } from './modules/produto/produto.config';
import { ProdutoReadResolver } from './modules/produto/resolvers/produto-read.resolver';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

describe('app-routing.module.spec | AppRoutingModule', () => {
  let router: Router;
  let location: Location;
  let httpTestingController: HttpTestingController;

  const authService = jasmine.createSpyObj<AuthService>(['isLogged']);
  authService.isLogged.and.returnValue((true));

  const fornecedorReadResolver = jasmine.createSpyObj<FornecedorReadResolver>(['resolve']);
  fornecedorReadResolver.resolve.and.returnValue(of(FORNECEDOR_MOCK));

  const produtoReadResolver = jasmine.createSpyObj<ProdutoReadResolver>(['resolve']);
  produtoReadResolver.resolve.and.returnValue(of(PRODUTO_MOCK));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule.withRoutes(routes),
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    });

    TestBed.overrideProvider(FornecedorReadResolver, {
      useValue: fornecedorReadResolver
    });

    TestBed.overrideProvider(ProdutoReadResolver, {
      useValue: produtoReadResolver
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('Deve conter 3 rotas principais', () => {
    expect(router.config.length).toBe(3);
  });

  it('Deve conter 5 rotas filhas carregadas no componente LayoutBaseComponent', () => {
    expect(router.config[0].children.length).toBe(5);
  });

  it('Deve redirecionar para /home', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/home');
  });

  it('Deve redirecionar para /erro', async () => {
    const url = await router
      .navigateByUrl('/rota-inexistente')
      .then(() => location.path());
    expect(url).toBe('/erro');
  });

  it('Deve navegar para módulo de autenticação', async () => {
    const url = await router
      .navigateByUrl(AUTH_CONFIG.path)
      .then(() => location.path());
    expect(url).toBe(AUTH_CONFIG.pathFront);
  });

  it('Deve navegar para módulo de fornecedor', async () => {
    const url = await router
      .navigateByUrl(FORNECEDOR_CONFIG.path)
      .then(() => {
        return location.path();
      });
    expect(url).toBe(FORNECEDOR_CONFIG.pathFront);
  });

  it('Deve navegar para módulo de produto', async () => {
    const url = await router
      .navigateByUrl(PRODUTO_CONFIG.path)
      .then(() => location.path());
    expect(url).toBe(PRODUTO_CONFIG.pathFront);
  });

  it('Deve navegar para módulo de usuário', async () => {
    const url = await router
      .navigateByUrl(USUARIO_CONFIG.path)
      .then(() => location.path());
    expect(url).toBe(USUARIO_CONFIG.pathFront);
  });
});
