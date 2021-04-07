import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoFieldModule } from '@po-ui/ng-components';
import { FornecedorNovoComponent } from '../pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorService } from '../services/fornecedor.service';
import { FornecedorNovoGuard } from './fornecedor-novo.guard';

describe('fornecedor-novo.guard.spec | FornecedorNovoGuard', () => {
  let guard: FornecedorNovoGuard;
  let fixture: ComponentFixture<FornecedorNovoComponent>;

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
          FornecedorNovoGuard,
          PoDialogService,
          FormBuilder,
          FornecedorService,
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(FornecedorNovoGuard);
    fixture = TestBed.createComponent(FornecedorNovoComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
