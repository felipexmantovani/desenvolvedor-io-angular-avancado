import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService, PoDividerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { FORNECEDOR_MOCK } from '../../../mocks/fornecedor.mock';
import { FornecedorFormComponent } from '../component/fornecedor-form/fornecedor-form.component';
import { FornecedorService } from '../services/fornecedor.service';
import { FornecedorNovoGuard } from './fornecedor-novo.guard';

describe('fornecedor-novo.guard.spec | FornecedorNovoGuard', () => {
  let guard: FornecedorNovoGuard;
  let component: FornecedorFormComponent;
  let fixture: ComponentFixture<FornecedorFormComponent>;

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
        declarations: [FornecedorFormComponent],
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
    fixture = TestBed.createComponent(FornecedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve retornar true caso formulário não estiver dirty e o fornecedor não possuir id', async () => {
    component.fornecedor = FORNECEDOR_MOCK[1];
    component.form.markAsDirty();
    const verify = await guard.canDeactivate(component);
    expect(verify).toBeTruthy();
  });
});
