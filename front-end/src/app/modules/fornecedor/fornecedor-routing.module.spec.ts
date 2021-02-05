import { Location } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { AuthGuard } from '../auth/guards/auth.guard';
import { routes } from './fornecedor-routing.module';
import { FORNECEDOR_MOCK } from './mock/fornecedor.mock';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';

describe('fornecedor-routing.module.spec | FornecedorRoutingModule', () => {
  let router: Router;
  let location: Location;
  let authGuard: jasmine.SpyObj<AuthGuard>;
  let fornecedorReadResolver: jasmine.SpyObj<FornecedorReadResolver>;

  authGuard = jasmine.createSpyObj<AuthGuard>(['canLoad', 'canActivate']);
  authGuard.canActivate.and.returnValue(true);

  fornecedorReadResolver = jasmine.createSpyObj<FornecedorReadResolver>(['resolve']);
  fornecedorReadResolver.resolve.and.returnValue(of(FORNECEDOR_MOCK));

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
        }
      ],
    });

    router = TestBed.inject(Router);
    location = TestBed.inject(Location);
  });

  it('Deve conter 2 rotas', () => {
    expect(router.config.length).toBe(2);
  });

  it('Deve navegar para listagem de fornecedores', async () => {
    const url = await router.navigateByUrl('').then(() => location.path());
    expect(url).toBe('/');
  });

  it('Deve navegar para /novo', async () => {
    const url = await router.navigateByUrl('/novo').then(() => location.path());
    expect(url).toBe('/novo');
  });
});
