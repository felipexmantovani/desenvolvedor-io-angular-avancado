import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProdutoGetByIdResolver } from './produto-get-by-id.resolver';

describe('produto-get-by-id.resolver.spec | ProdutoGetByIdResolver', () => {
  let guard: ProdutoGetByIdResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    });

    guard = TestBed.inject(ProdutoGetByIdResolver);
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
