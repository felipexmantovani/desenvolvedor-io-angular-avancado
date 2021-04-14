import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { FORNECEDOR_MOCK } from '../../../../mocks/fornecedor.mock';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorFormComponent } from './fornecedor-form.component';

describe('fornecedor-form.component.spec | FornecedorFormComponent', () => {
  let component: FornecedorFormComponent;
  let fixture: ComponentFixture<FornecedorFormComponent>;
  let router: Router;

  let notificationService: jasmine.SpyObj<NotificationService>;
  notificationService = jasmine.createSpyObj<NotificationService>(['error', 'success']);

  let fornecedorService: jasmine.SpyObj<FornecedorService>;
  fornecedorService = jasmine.createSpyObj<FornecedorService>(['create']);

  const fornecedor = FORNECEDOR_MOCK[0];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorFormComponent],
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        PoFieldModule
      ],
      providers: [
        FormBuilder,
        {
          provide: FornecedorService,
          useValue: fornecedorService
        },
        {
          provide: NotificationService,
          useValue: notificationService
        }
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar os inputs options corretamente', () => {
    expect(component.options[0].label).toBe('Pessoa física');
    expect(component.options[0].value).toBe('1');
    expect(component.options[1].label).toBe('Pessoa jurídica');
    expect(component.options[1].value).toBe('2');
  });

  it('Deve criar o formulário corretamente', () => {
    expect(component.form).toBeTruthy();
    expect(component.form.controls.hasOwnProperty('ativo')).toBeTrue();
    expect(component.form.controls.hasOwnProperty('documento')).toBeTrue();
    expect(component.form.controls.hasOwnProperty('endereco')).toBeTrue();
    expect(component.form.controls.hasOwnProperty('nome')).toBeTrue();
    expect(component.form.controls.hasOwnProperty('tipoFornecedor')).toBeTrue();
  });

  it('Deve atualizar a validação do control "documento" conforme tipo de fornecedor selecionado', () => {
    spyOn(component.form, 'updateValueAndValidity');

    component.changeTipoFornecedor('1');
    expect(component.form.get('documento').status).toBe('VALID');
    expect(component.form.updateValueAndValidity).toHaveBeenCalled();

    component.changeTipoFornecedor('2');
    expect(component.form.get('documento').status).toBe('VALID');
    expect(component.form.updateValueAndValidity).toHaveBeenCalled();
  });

  it('Deve exibir notificação caso formulário não estiver válido ao fazer o submit', () => {
    component.onSubmit();
    expect(notificationService.error).toHaveBeenCalledWith('Verifique o formulário.');
  });

  it('Deve exibir notificação de sucesso caso formulário esteja válido', () => {
    fornecedorService.create.and.returnValue(of(fornecedor));
    spyOn(router, 'navigateByUrl');

    component.form.patchValue(fornecedor);
    component.onSubmit();
    fornecedorService
      .create(component.fornecedor)
      .subscribe(fornecedorRes => {
        expect(notificationService.success).toHaveBeenCalledWith(`Fornecedor ${fornecedorRes.nome} cadastrado com sucesso.`);
        expect(router.navigateByUrl).toHaveBeenCalledWith(FORNECEDOR_CONFIG.pathFront);
      });
  });

  it('Deve submeter o formulário ao pressionar a tecla Enter', () => {
    component.form.patchValue(fornecedor);
    const spy = spyOn(component, 'onSubmit');
    const event = new KeyboardEvent('window:keyup', {
      key: 'Enter'
    });
    component.keyUp(event);
    expect(spy).toHaveBeenCalled();
  });
});
