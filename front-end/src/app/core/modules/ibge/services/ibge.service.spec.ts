import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, waitForAsync } from '@angular/core/testing';
import { IbgeService } from './ibge.service';

describe('ibge.service.spec | IbgeService', () => {
  let service: IbgeService;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
    })
  );

  beforeEach(() => {
    service = TestBed.inject(IbgeService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
