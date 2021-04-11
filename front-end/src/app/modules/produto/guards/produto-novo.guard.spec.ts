import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoFieldModule } from '@po-ui/ng-components';
import { FornecedorService } from '../../fornecedor/services/fornecedor.service';
import { ProdutoNovoComponent } from '../pages/produto-novo/produto-novo.component';
import { ProdutoService } from '../services/produto.service';
import { ProdutoNovoGuard } from './produto-novo.guard';

describe('produto-novo.guard.spec | ProdutoNovoGuard', () => {
  let guard: ProdutoNovoGuard;
  let fixture: ComponentFixture<ProdutoNovoComponent>;

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
          ProdutoNovoGuard,
          PoDialogService,
          FormBuilder,
          ProdutoService,
          FornecedorService
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(ProdutoNovoGuard);
    fixture = TestBed.createComponent(ProdutoNovoComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
