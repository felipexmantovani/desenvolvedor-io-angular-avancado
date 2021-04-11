import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { FornecedorGetByIdResolver } from './fornecedor-get-by-id.resolver';

describe('fornecedor-get-by-id.resolver.spec | FornecedorGetByIdResolver', () => {
  let guard: FornecedorGetByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    guard = TestBed.inject(FornecedorGetByIdResolver);
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
