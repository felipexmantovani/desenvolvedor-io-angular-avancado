import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { ViaCepService } from './via-cep.service';

describe('via-cep.service.spec | ViaCeoService', () => {
  let service: ViaCepService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(ViaCepService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
