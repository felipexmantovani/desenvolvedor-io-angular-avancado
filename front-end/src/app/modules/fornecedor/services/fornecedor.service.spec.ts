import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { APP_CONFIG } from '../../../app.config';
import { FORNECEDOR_MOCK } from '../../../mocks/fornecedor.mock';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from './fornecedor.service';

describe('fornecedor.service.spec | FornecedorService', () => {
  let service: FornecedorService;
  let httpTestingController: HttpTestingController;

  const fornecedorMock: Fornecedor = FORNECEDOR_MOCK[1];

  const fornecedoresMock: Array<Fornecedor> = FORNECEDOR_MOCK;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [FornecedorService]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FornecedorService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar o fornecedor após cadastra-lo corretamente', () => {
    service.save(fornecedorMock).subscribe(fornecedor => {
      expect(fornecedor).toEqual(fornecedorMock);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}` &&
        req.method === 'POST' &&
        req.body === fornecedorMock
      );
    })
    .flush({data: fornecedorMock});
  });

  it('Deve retornar uma lista de fornecedores', () => {
    service.read().subscribe(fornecedores => {
      expect(fornecedores.length).toBe(5);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}` &&
        req.method === 'GET'
      );
    })
    .flush(fornecedoresMock);
  });

  it('Deve retornar um fornecedor ao buscar pelo ID', () => {
    const fornecedorRes = FORNECEDOR_MOCK[4];
    service.readById('5').subscribe(fornecedor => {
      expect(fornecedor).toEqual(fornecedorRes);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}/${fornecedorRes.id}` &&
        req.method === 'GET'
      );
    })
    .flush(fornecedorRes);
  });

  it('Deve atualizar o fornecedor', () => {
    fornecedorMock.nome = 'Nome Alterado';
    service.update(fornecedorMock).subscribe(fornecedor => {
      expect(fornecedor.nome).toBe('Nome Alterado');
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}/${fornecedorMock.id}` &&
        req.method === 'PUT' &&
        req.body === fornecedorMock
      );
    })
    .flush({data: fornecedorMock});
  });

  it('Deve remover um fornecedor', () => {
    service.delete(2).subscribe(fornecedor => {
      expect(fornecedor).toEqual(fornecedorMock);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApi}/${fornecedorMock.id}` &&
        req.method === 'DELETE'
      );
    })
    .flush({data: fornecedorMock});
  });

  it('Deve retornar um endereço quando buscado pelo ID', () => {
    const fornecedorRes = FORNECEDOR_MOCK[4];
    service.readEnderecoById(5).subscribe(endereco => {
      expect(endereco).toEqual(fornecedorRes.endereco);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}/${fornecedorRes.endereco.id}` &&
        req.method === 'GET'
      );
    })
    .flush({data: fornecedorRes.endereco});
  });

  it('Deve atualizar o um endereço', () => {
    fornecedorMock.endereco.bairro = 'Bairro Alterado';
    service.updateEndereco(fornecedorMock.endereco).subscribe(endereco => {
      expect(endereco.bairro).toBe('Bairro Alterado');
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}/${fornecedorMock.endereco.id}` &&
        req.method === 'PUT' &&
        req.body === fornecedorMock.endereco
      );
    })
    .flush({data: fornecedorMock.endereco});
  });
});
