import { HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExceptionService } from '../../../services/exception/exception.service';
import { IbgeMunicipio } from '../models/municipio.interface';
import { IbgeUf } from '../models/uf.interface';
import { IbgeService } from './ibge.service';

describe('ibge.service.spec | IbgeService', () => {

  let service: IbgeService;
  let httpTestingController: HttpTestingController;

  const exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        providers: [
          {
            provide: ExceptionService,
            useValue: exceptionService
          }
        ]
      });
    })
  );

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(IbgeService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar um array vazio após fazer busca por estados getEstados()', () => {
    service.getEstados().subscribe((ibgeUf: Array<IbgeUf>) => {
      expect(ibgeUf.length).toBe(0);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === IbgeService.API_ESTADOS &&
        req.method === 'GET'
      );
    })
    .flush([]);
  });

  it('Deve tratar erro ao consumir getEstados()', () => {
    service.getEstados().subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(exceptionService.handleError).toHaveBeenCalled();
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Erro intensional');
      }
    );

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === IbgeService.API_ESTADOS &&
        req.method === 'GET'
      );
    })
    .flush(null, { status: 400, statusText: 'Erro intensional' });

    expect(exceptionService.handleError).toHaveBeenCalled();
  });

  it('Deve retornar um array vazio após fazer busca por municípios getMunicipios()', () => {
    const estado = 'PR';

    service.getMunicipios(estado).subscribe((ibgeMunicipio: Array<IbgeMunicipio>) => {
      expect(ibgeMunicipio.length).toBe(0);
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${IbgeService.API_ESTADOS}/${estado}/municipios` &&
        req.method === 'GET'
      );
    })
    .flush([]);
  });

  it('Deve tratar erro ao consumir getMunicipios()', () => {
    const estado = 'PR';

    service.getMunicipios(estado).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(exceptionService.handleError).toHaveBeenCalled();
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Erro intensional');
      }
    );

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${IbgeService.API_ESTADOS}/${estado}/municipios` &&
        req.method === 'GET'
      );
    })
    .flush(null, { status: 400, statusText: 'Erro intensional' });

    expect(exceptionService.handleError).toHaveBeenCalled();
  });

  it('Deve retornar null vazio após fazer busca por município getMunicipio()', () => {
    const idMunicipio = '123';

    service.getMunicipio(idMunicipio).subscribe((ibgeMunicipio) => {
      expect(ibgeMunicipio).toBeNull();
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${IbgeService.API_MUNICIPIOS}/${idMunicipio}` &&
        req.method === 'GET'
      );
    })
    .flush(null);
  });

  it('Deve tratar erro ao consumir getMunicipio()', () => {
    const idMunicipio = '123';

    service.getMunicipio(idMunicipio).subscribe(
      () => {},
      (error: HttpErrorResponse) => {
        expect(exceptionService.handleError).toHaveBeenCalled();
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Erro intensional');
      }
    );

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${IbgeService.API_MUNICIPIOS}/${idMunicipio}` &&
        req.method === 'GET'
      );
    })
    .flush(null, { status: 400, statusText: 'Erro intensional' });

    expect(exceptionService.handleError).toHaveBeenCalled();
  });

});
