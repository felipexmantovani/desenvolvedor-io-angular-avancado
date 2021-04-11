import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProdutoService } from './produto.service';

describe('produto.service.spec | ProdutoService', () => {
  let service: ProdutoService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    service = TestBed.inject(ProdutoService);
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });
});
