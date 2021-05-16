import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { PRODUTO_MOCK } from '../../../mocks/produto.mock';
import { PRODUTO_CONFIG } from '../produto.config';
import { ProdutoGetByIdResolver } from './produto-get-by-id.resolver';

describe('produto-get-by-id.resolver.spec | ProdutoGetByIdResolver', () => {

  let resolver: ProdutoGetByIdResolver;
  let httpTestingController: HttpTestingController;

  const activatedRouteSnapshot = {
    params: {
      id: '123'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    resolver = TestBed.inject(ProdutoGetByIdResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Deve ser criado', () => {
    expect(resolver).toBeTruthy();
  });

  it('Deve executar endpoint readById no método resolve() e retornar o produto', () => {
    resolver.resolve(activatedRouteSnapshot as any).subscribe((res) => {
      expect(res).toEqual(PRODUTO_MOCK[0]);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${PRODUTO_CONFIG.pathApi}/123` &&
        req.method === 'GET'
      );
    })
    .flush(PRODUTO_MOCK[0]);
  });

});
