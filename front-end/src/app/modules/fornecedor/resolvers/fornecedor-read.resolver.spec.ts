import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FORNECEDOR_MOCK } from '../../../../../mocks/fornecedor/fornecedor.mock';
import { APP_CONFIG } from '../../../app.config';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { FornecedorReadResolver } from './fornecedor-read.resolver';

describe('fornecedor-read.resolver.spec | FornecedorReadResolver', () => {
  let resolver: FornecedorReadResolver;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });
    resolver = TestBed.inject(FornecedorReadResolver);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('Deve ser criado', () => {
    expect(resolver).toBeTruthy();
  });

  it('Deve chamar a api e obter a lista de fornecedores', () => {
    resolver.resolve().subscribe(res => {
      expect(res.length).toBe(5);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}` &&
        req.method === 'GET'
      );
    })
    .flush(FORNECEDOR_MOCK);
  });
});
