import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoFieldModule } from '@po-ui/ng-components';
import { FornecedorDetalheComponent } from '../pages/fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorService } from '../services/fornecedor.service';
import { FornecedorDetalheGuard } from './fornecedor-detalhe.guard';

describe('fornecedor-detalhe.guard.spec | FornecedorDetalheGuard', () => {
  let guard: FornecedorDetalheGuard;
  let fixture: ComponentFixture<FornecedorDetalheComponent>;

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
          FornecedorDetalheGuard,
          PoDialogService,
          FormBuilder,
          FornecedorService,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(FornecedorDetalheGuard);
    fixture = TestBed.createComponent(FornecedorDetalheComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
