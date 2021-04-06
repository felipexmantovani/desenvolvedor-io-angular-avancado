import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoDividerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { FornecedorNovoComponent } from '../pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorService } from '../services/fornecedor.service';
import { FornecedorNovoGuard } from './fornecedor-novo.guard';

describe('fornecedor-novo.guard.spec | FornecedorNovoGuard', () => {
  let guard: FornecedorNovoGuard;
  let component: FornecedorNovoComponent;
  let fixture: ComponentFixture<FornecedorNovoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          PoPageModule,
          PoFieldModule,
          PoDividerModule,
          ReactiveFormsModule
        ],
        declarations: [FornecedorNovoComponent],
        providers: [
          FornecedorNovoGuard,
          PoDialogService,
          FormBuilder,
          FornecedorService,
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(FornecedorNovoGuard);
    fixture = TestBed.createComponent(FornecedorNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
