import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FORNECEDOR_MOCK } from '../../../../../mocks/fornecedor/fornecedor.mock';
import { APP_CONFIG } from '../../../app.config';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { FornecedorGetByIdResolver } from './fornecedor-get-by-id.resolver';

describe('fornecedor-get-by-id.resolver.spec | FornecedorGetByIdResolver', () => {

  let resolver: FornecedorGetByIdResolver;
  let httpTestingController: HttpTestingController;

  const activatedRouteSnapshot = {
    params: {
      id: '123'
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule
      ]
    });

    resolver = TestBed.inject(FornecedorGetByIdResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Deve ser criado', () => {
    expect(resolver).toBeTruthy();
  });

  it('Deve executar endpoint readById no método resolve() e retornar o fornecedor', () => {
    resolver.resolve(activatedRouteSnapshot as any).subscribe((res) => {
      expect(res).toEqual(FORNECEDOR_MOCK[0]);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}/123` &&
        req.method === 'GET'
      );
    })
    .flush(FORNECEDOR_MOCK[0]);
  });

});
