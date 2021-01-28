import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { routes } from './app-routing.module';
import { AUTH_CONFIG } from './modules/auth/auth.config';
import { Fornecedor } from './modules/fornecedor/models/fornecedor.interface';
import { FornecedorService } from './modules/fornecedor/services/fornecedor.service';
import { Produto } from './modules/produto/models/produto.interface';
import { PRODUTO_CONFIG } from './modules/produto/produto.config';
import { USUARIO_CONFIG } from './modules/usuario/usuario.config';

describe('app-routing.module.spec | AppRoutingModule', () => {
  let router: Router;
  let location: Location;
  let fornecedorService: jasmine.SpyObj<FornecedorService>;

  const fornecedores: Array<Fornecedor> = [
    {
      ativo: true,
      documento: '123456789',
      endereco: {
        bairro: 'bairro',
        cep: '123123123',
        cidade: 'cidade',
        complemento: 'complemento',
        estado: 'PR',
        fornecedorId: '123',
        id: '1',
        logradouro: 'logradouro',
        numero: '2'
      },
      id: '123',
      nome: 'nome',
      produtos: new Array<Produto>(),
      tipoFornecedor: 1
    }
  ];

  fornecedorService = jasmine.createSpyObj<FornecedorService>(['read']);
  fornecedorService.read.and.returnValue(of(fornecedores));

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule.withRoutes(routes),
        ],
        providers: [
          {
            provide: FornecedorService,
            useValue: fornecedorService
          }
        ]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
    router.initialNavigation();
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

  // TO-DO
  // it('Deve navegar para módulo de fornecedor', async () => {
  //   const url = await router
  //     .navigateByUrl(FORNECEDOR_CONFIG.path)
  //     .then(() => location.path());
  //   expect(url).toBe(FORNECEDOR_CONFIG.pathFront);
  // });

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
