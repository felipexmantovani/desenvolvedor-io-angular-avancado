import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { APP_CONFIG } from '../../../app.config';
import { FORNECEDOR_MOCK } from '../../../mocks/fornecedor.mock';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { FORNECEDOR_CONFIG } from '../fornecedor.config';
import { Fornecedor } from '../models/fornecedor.interface';
import { FornecedorService } from './fornecedor.service';

describe('fornecedor.service.spec | FornecedorService', () => {

  let service: FornecedorService;
  let httpTestingController: HttpTestingController;

  const fornecedorMock: Fornecedor = FORNECEDOR_MOCK[1];

  const exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: ExceptionService,
          useValue: exceptionService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(FornecedorService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
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

  it('Deve tratar erro do readEnderecoById', () => {
    const fornecedorRes = FORNECEDOR_MOCK[4];
    service.readEnderecoById(5).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(exceptionService.handleError).toHaveBeenCalled();
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Erro intensional');
      }
    );

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}/${fornecedorRes.endereco.id}` &&
        req.method === 'GET'
      );
    })
    .flush(null, { status: 400, statusText: 'Erro intensional' });
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

  it('Deve tratar erro do updateEndereco', () => {
    fornecedorMock.endereco.bairro = 'Bairro Alterado';
    service.updateEndereco(fornecedorMock.endereco).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(exceptionService.handleError).toHaveBeenCalled();
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Erro intensional');
      }
    );

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${APP_CONFIG.apiV1}${FORNECEDOR_CONFIG.pathApiEndereco}/${fornecedorMock.endereco.id}` &&
        req.method === 'PUT' &&
        req.body === fornecedorMock.endereco
      );
    })
    .flush(null, { status: 400, statusText: 'Erro intensional' });

    expect(exceptionService.handleError).toHaveBeenCalled();
  });

  it('Deve retornar um Array<PoComboOption>', () => {
    spyOn(service, 'read').and.returnValue(of(FORNECEDOR_MOCK));
    service.getFilteredData({ property: 'nome', value: FORNECEDOR_MOCK[0].nome }).subscribe(combo => {
      expect(combo[0].label).toBe(FORNECEDOR_MOCK[0].nome);
      expect(combo[0].value).toBe(FORNECEDOR_MOCK[0].id);
    });
  });

  it('Deve retornar um PoComboOption após fazer busca por id', () => {
    spyOn(service, 'readById').and.returnValue(of(FORNECEDOR_MOCK[0]));
    service.getObjectByValue(FORNECEDOR_MOCK[0].id).subscribe(combo => {
      expect(combo.label).toBe(FORNECEDOR_MOCK[0].nome);
      expect(combo.value).toBe(FORNECEDOR_MOCK[0].id);
    });
  });

});
