import { HttpRequest } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ExceptionService } from '../exception/exception.service';
import { CrudGenericService } from './crud-generic.service';

interface T {
  id: string;
  nome: string;
}

const MOCK: Array<T> = [
  {
    id: '123',
    nome: 'Nome 1'
  },
  {
    id: '456',
    nome: 'Nome 2'
  },
  {
    id: '789',
    nome: 'Nome 3'
  }
];

describe('crud-generic.service.spec | CrudGenericService', () => {
  let service: CrudGenericService<T>;
  let httpTestingController: HttpTestingController;

  const exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);
  exceptionService.handleError.and.callThrough();

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [
        {
          provide: String, useValue: ''
        },
        {
          provide: ExceptionService,
          useValue: exceptionService
        }
      ]
    });

    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(CrudGenericService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  describe('CREATE', () => {
    it('Deve retornar o registro após o cadastro', () => {
      service.create(MOCK[0]).subscribe(data => expect(data).toEqual(MOCK[0]));

      httpTestingController.expectOne((req: HttpRequest<any>) => {
        return (
          req.method === 'POST' &&
          req.body === MOCK[0]
        );
      })
      .flush({ data: MOCK[0] });
    });

    it('Deve lançar um erro', () => {});
  });

  describe('READ', () => {
    it('Deve retornar uma lista de registros', () => {
      service.read().subscribe(data => {
        expect(data.length).toBe(3);
      });

      httpTestingController.expectOne((req: HttpRequest<any>) => req.method === 'GET')
      .flush(MOCK);
    });

    it('Deve lançar um erro', () => {});
  });

  describe('BY-ID', () => {
    it('Deve retornar um registro ao buscar pelo ID', () => {
      const res = MOCK[0];
      service.readById('123').subscribe(data => {
        expect(data).toEqual(res);
      });

      httpTestingController.expectOne((req: HttpRequest<any>) => req.method === 'GET')
      .flush(res);
    });

    it('Deve lançar um erro', () => {});
  });

  describe('PUT', () => {
    it('Deve atualizar o registro', () => {
      MOCK[0].nome = 'Nome alterado';
      service.update(MOCK[0]).subscribe(data => {
        expect(data.nome).toBe('Nome alterado');
      });

      httpTestingController.expectOne((req: HttpRequest<any>) => {
        return (
          req.method === 'PUT' &&
          req.body === MOCK[0]
        );
      })
      .flush({ data: MOCK[0] });
    });

    it('Deve lançar um erro', () => {});
  });

  describe('DELETE', () => {
    it('Deve remover um registro', () => {
      service.delete('123').subscribe(data => {
        expect(data).toEqual(MOCK[0]);
      });

      httpTestingController.expectOne((req: HttpRequest<any>) => req.method === 'DELETE')
      .flush({ data: MOCK[0] });
    });

    it('Deve lançar um erro', () => {});
  });
});
