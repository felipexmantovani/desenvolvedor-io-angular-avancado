import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ViaCep } from '../models/via-cep.interface';
import { ViaCepService } from './via-cep.service';

describe('via-cep.service.spec | ViaCeoService', () => {
  let service: ViaCepService;
  let httpTestingController: HttpTestingController;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
    })
  );

  beforeEach(() => {
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(ViaCepService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve retornar um array vazio após fazer busca pelo CEP', () => {
    const cep = '87580000';

    service.get(cep).subscribe((viaCep: ViaCep) => {
      expect(viaCep).toBeTruthy();
    });

    httpTestingController.expectOne((req: HttpRequest<any>) => {
      return (
        req.url === `${ViaCepService.API}/${cep}/json` &&
        req.method === 'GET'
      );
    })
    .flush([]);
  });
});
