import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoFieldModule } from '@po-ui/ng-components';
import { ProdutoDetalheComponent } from '../pages/produto-detalhe/produto-detalhe.component';
import { ProdutoDetalheGuard } from './produto-detalhe.guard';

describe('produto-detalhe.guard.spec | ProdutoDetalheGuard', () => {
  let guard: ProdutoDetalheGuard;
  let fixture: ComponentFixture<ProdutoDetalheComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          PoFieldModule,
          ReactiveFormsModule
        ],
        providers: [
          PoDialogService,
          FormBuilder,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(ProdutoDetalheGuard);
    fixture = TestBed.createComponent(ProdutoDetalheComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
