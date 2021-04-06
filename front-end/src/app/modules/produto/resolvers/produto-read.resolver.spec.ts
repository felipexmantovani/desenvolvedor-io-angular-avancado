import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { PRODUTO_MOCK } from '../../../mocks/produto.mock';
import { AuthService } from '../../auth/services/auth.service';
import { PRODUTO_CONFIG } from '../produto.config';
import { ProdutoService } from '../services/produto.service';
import { ProdutoReadResolver } from './produto-read.resolver';

describe('produto-read.resolver.spec | ProdutoReadResolver', () => {
  let resolver: ProdutoReadResolver;
  let httpTestingController: HttpTestingController;

  const authService = jasmine.createSpyObj<AuthService>(['isLogged']);
  authService.isLogged.and.returnValue(true);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        ProdutoReadResolver,
        ProdutoService,
        {
          provide: AuthService,
          useValue: authService
        }
      ]
    });
    resolver = TestBed.inject(ProdutoReadResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Deve ser criado', () => {
    expect(resolver).toBeTruthy();
  });

  it('Deve chamar a api e obter a lista de produtos', () => {
    resolver.resolve().subscribe(res => {
      expect(res.length).toBe(7);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${PRODUTO_CONFIG.pathApi}` &&
        req.method === 'GET'
      );
    })
    .flush(PRODUTO_MOCK);
  });
});
