import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PRODUTO_MOCK } from '../../mocks/produto.mock';
import { AuthService } from '../auth/services/auth.service';
import { routes } from './produto-routing.module';
import { ProdutoGetByIdResolver } from './resolvers/produto-get-by-id.resolver';
import { ProdutoReadResolver } from './resolvers/produto-read.resolver';

describe('produto-routing.module.spec | ProdutoRoutingModule', () => {
  let router: Router;
  let location: Location;

  const authService = jasmine.createSpyObj<AuthService>(['isLogged']);
  authService.isLogged.and.returnValue(true);

  const produtoReadResolver = jasmine.createSpyObj<ProdutoReadResolver>(['resolve']);
  produtoReadResolver.resolve.and.returnValue(of(PRODUTO_MOCK));

  const produtoGetByIdResolver = jasmine.createSpyObj<ProdutoGetByIdResolver>(['resolve']);
  produtoGetByIdResolver.resolve.and.returnValue(of(PRODUTO_MOCK[0]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes(routes),
        HttpClientTestingModule
      ],
      providers: [
        {
          provide: AuthService,
          useValue: authService
        },
        {
          provide: ProdutoReadResolver,
          useValue: produtoReadResolver
        },
        {
          provide: ProdutoGetByIdResolver,
          useValue: produtoGetByIdResolver
        }
      ]
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 3 rotas', () => {
    expect(router.config.length).toBe(3);
  });

  it('Deve navegar para listagem de produtos', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/');
  });

  it('Deve navegar para /novo', async () => {
    const url = await router.navigateByUrl('/novo').then(() => location.path());
    expect(url).toBe('/novo');
  });

  it('Deve navegar para detalhes do produto', async () => {
    const url = await router.navigateByUrl('detalhe/123').then(() => location.path());
    expect(url).toBe('/detalhe/123');
  });
});
