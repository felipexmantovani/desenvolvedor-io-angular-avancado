import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IbgeMunicipio } from '../models/municipio.interface';
import { IbgeUf } from '../models/uf.interface';
import { IbgeService } from './ibge.service';

describe('ibge.service.spec | IbgeService', () => {
  let service: IbgeService;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule, RouterTestingModule],
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

  it('Deve retornar um array vazio após fazer busca por estados', () => {
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

  it('Deve retornar um array vazio após fazer busca por municípios', () => {
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
});
