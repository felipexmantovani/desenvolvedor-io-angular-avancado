import { HttpErrorResponse } from '@angular/common/http';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { FORNECEDOR_MOCK } from '../../../../mocks/fornecedor.mock';
import { HttpStatusCodeEnum } from '../../../../shared/enums/http-status-code.enum';
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
  fornecedorService = jasmine.createSpyObj<FornecedorService>(['save']);

  let exceptionService: jasmine.SpyObj<ExceptionService>;
  exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);

  const fornecedor = FORNECEDOR_MOCK[0];

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorFormComponent],
      providers: [
        FormBuilder,
        {
          provide: FornecedorService,
          useValue: fornecedorService
        },
        {
          provide: NotificationService,
          useValue: notificationService
        },
        {
          provide: ExceptionService,
          useValue: exceptionService
        }
      ],
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
    expect(component.form.get('documento').status).toBe('INVALID');
    expect(component.form.get('documento').errors.hasOwnProperty('required')).toBeTrue();
    expect(component.form.updateValueAndValidity).toHaveBeenCalled();

    component.changeTipoFornecedor('2');
    expect(component.form.get('documento').status).toBe('INVALID');
    expect(component.form.get('documento').errors.hasOwnProperty('required')).toBeTrue();
    expect(component.form.updateValueAndValidity).toHaveBeenCalled();
  });

  it('Deve exibir notificação caso formulário não estiver válido ao fazer o submit', () => {
    component.onSubmit();
    expect(notificationService.error).toHaveBeenCalledWith('Verifique o formulário.');
  });

  it('Deve exibir notificação de sucesso caso formulário esteja válido', () => {
    fornecedorService.save.and.returnValue(of(fornecedor));
    spyOn(router, 'navigateByUrl');

    component.form.patchValue(fornecedor);
    component.onSubmit();
    fornecedorService
      .save(component.fornecedor)
      .subscribe(fornecedorRes => {
        expect(notificationService.success).toHaveBeenCalledWith(`Fornecedor ${fornecedorRes.nome} cadastrado com sucesso.`);
        expect(router.navigateByUrl).toHaveBeenCalledWith(FORNECEDOR_CONFIG.pathFront);
      });
  });

  it('Deve tratar erro ao consumir fornecedorService', (done: DoneFn) => {
    fornecedorService.save.and.returnValue(throwError(new HttpErrorResponse(
      {
        status: HttpStatusCodeEnum.NotFound,
        statusText: 'Ocorreu um erro no servidor.'
      }
    )));

    component.form.patchValue(fornecedor);
    component.onSubmit();

    expect(exceptionService.handleError).toHaveBeenCalled();
    done();
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
