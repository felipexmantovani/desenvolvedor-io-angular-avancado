import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { FORNECEDOR_MOCK } from '../../../../mocks/fornecedor/fornecedor.mock';
import { AuthGuard } from '../auth/guards/auth.guard';
import { routes } from './fornecedor-routing.module';
import { FornecedorGetByIdResolver } from './resolvers/fornecedor-get-by-id.resolver';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';

describe('fornecedor-routing.module.spec | FornecedorRoutingModule', () => {
  let router: Router;
  let location: Location;

  const authGuard = jasmine.createSpyObj<AuthGuard>(['canLoad', 'canActivate']);
  authGuard.canActivate.and.returnValue(true);

  const fornecedorReadResolver = jasmine.createSpyObj<FornecedorReadResolver>(['resolve']);
  fornecedorReadResolver.resolve.and.returnValue(of(FORNECEDOR_MOCK));

  const fornecedorGetByIdResolver = jasmine.createSpyObj<FornecedorGetByIdResolver>(['resolve']);
  fornecedorGetByIdResolver.resolve.and.returnValue(of(FORNECEDOR_MOCK[0]));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule.withRoutes(routes)],
      providers: [
        {
          provide: AuthGuard,
          useValue: authGuard
        },
        {
          provide: FornecedorReadResolver,
          useValue: fornecedorReadResolver
        },
        {
          provide: FornecedorGetByIdResolver,
          useValue: fornecedorGetByIdResolver
        }
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 3 rotas', () => {
    expect(router.config.length).toBe(3);
  });

  it('Deve navegar para listagem de fornecedores', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/');
  });

  it('Deve navegar para /novo', async () => {
    const url = await router.navigateByUrl('/novo').then(() => location.path());
    expect(url).toBe('/novo');
  });

  it('Deve navegar para detalhes do fornecedor', async () => {
    const url = await router.navigateByUrl('detalhe/123').then(() => location.path());
    expect(url).toBe('/detalhe/123');
  });
});
