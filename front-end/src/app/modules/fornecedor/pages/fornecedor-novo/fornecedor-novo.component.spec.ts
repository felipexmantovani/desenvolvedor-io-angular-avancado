import { HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDividerModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { of, throwError } from 'rxjs';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { HttpStatusCodeEnum } from '../../../../shared/enums/http-status-code.enum';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FORNECEDOR_MOCK } from '../../mock/fornecedor.mock';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorNovoComponent } from './fornecedor-novo.component';

describe('fornecedor-novo.component.spec | FornecedorNovoComponent', () => {
  let component: FornecedorNovoComponent;
  let fixture: ComponentFixture<FornecedorNovoComponent>;
  let router: Router;

  let notificationService: jasmine.SpyObj<NotificationService>;
  notificationService = jasmine.createSpyObj<NotificationService>(['error', 'success']);

  let fornecedorService: jasmine.SpyObj<FornecedorService>;
  fornecedorService = jasmine.createSpyObj<FornecedorService>(['save']);

  let exceptionService: jasmine.SpyObj<ExceptionService>;
  exceptionService = jasmine.createSpyObj<ExceptionService>(['handleError']);

  const fornecedor = FORNECEDOR_MOCK[0];

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FornecedorNovoComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          PoPageModule,
          PoDividerModule,
          PoFieldModule,
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
          },
          {
            provide: ExceptionService,
            useValue: exceptionService
          }
        ],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorNovoComponent);
    component = fixture.componentInstance;
    router =  TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
    expect(component.estados.length).toBe(0);
    expect(component.cidades.length).toBe(0);
  });

  it('Deve criar o título da página corretamente', () => {
    expect(component.pageTitle).toBe(`Novo ${FORNECEDOR_CONFIG.name}`);
  });

  it('Deve criar os inputs options corretamente', () => {
    expect(component.options[0].label).toBe('Pessoa física');
    expect(component.options[0].value).toBe('1');
    expect(component.options[1].label).toBe('Pessoa jurídica');
    expect(component.options[1].value).toBe('2');
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe(FORNECEDOR_CONFIG.namePlural);
    expect(component.breadcrumb.items[1].link).toBe(FORNECEDOR_CONFIG.pathFront);
    expect(component.breadcrumb.items[2].label).toBe(component.pageTitle);
  });

  it('Deve criar as actions corretamente', () => {
    expect(component.actions[0].label).toBe('Salvar');
    expect(component.actions[1].label).toBe('Cancelar');
    expect(component.actions[1].url).toBe(FORNECEDOR_CONFIG.pathFront);
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
