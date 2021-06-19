import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule, PoModalComponent } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { FORNECEDOR_MOCK } from '../../../../../../mocks/fornecedor/fornecedor.mock';
import { IBGE_MUNICIPIO_MOCK } from '../../../../../../mocks/ibge/ibge-municipio.mock';
import { IBGE_UF_MOCK } from '../../../../../../mocks/ibge/ibge-uf.mock';
import { IbgeService } from '../../../../shared/modules/ibge/services/ibge.service';
import { ViaCep } from '../../../../shared/modules/via-cep/models/via-cep.interface';
import { ViaCepService } from '../../../../shared/modules/via-cep/services/via-cep.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorFormComponent } from './fornecedor-form.component';

describe('fornecedor-form.component.spec | FornecedorFormComponent', () => {
  let component: FornecedorFormComponent;
  let fixture: ComponentFixture<FornecedorFormComponent>;
  let router: Router;

  const fornecedor = FORNECEDOR_MOCK[0];

  const fornecedorEndereco = FORNECEDOR_MOCK[0].endereco;

  const notificationService = jasmine.createSpyObj<NotificationService>(['error', 'success']);

  const fornecedorService = jasmine.createSpyObj<FornecedorService>(['create', 'update', 'updateEndereco']);
  fornecedorService.create.and.returnValue(of(fornecedor));
  fornecedorService.update.and.returnValue(of(fornecedor));
  fornecedorService.updateEndereco.and.returnValue(of(fornecedorEndereco));

  const ibgeService = jasmine.createSpyObj<IbgeService>(['getMunicipios', 'getMunicipio', 'getEstados']);
  ibgeService.getMunicipios.and.returnValue(of(IBGE_MUNICIPIO_MOCK));
  ibgeService.getMunicipio.and.returnValue(of(IBGE_MUNICIPIO_MOCK[0]));
  ibgeService.getEstados.and.returnValue(of(IBGE_UF_MOCK));

  const viaCepService = jasmine.createSpyObj<ViaCepService>(['get']);

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorFormComponent, PoModalComponent],
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
        },
        {
          provide: IbgeService,
          useValue: ibgeService
        },
        {
          provide: ViaCepService,
          useValue: viaCepService
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

  it('Deve chamar serviço para preencher o município caso for edição de formulário', () => {
    component.fornecedor = fornecedor;
    component.ngOnInit();
    expect(ibgeService.getMunicipio).toHaveBeenCalled();
  });

  it('Deve preencher endereço corretamente ao alterar o CEP', () => {
    component.form.get('endereco').get('cep').setValue('87.580-000');

    const viaCep: ViaCep = {
      bairro: 'Centro',
      cep: '87580000',
      complemento: 'Casa',
      ddd: 44,
      gia: 123,
      ibge: 123123,
      localidade: 'Localidade',
      logradouro: 'Logradouro',
      siafi: 123123,
      uf: 'PR'
    };

    viaCepService.get.and.returnValue(of(viaCep));

    component.changeCep(component.form.get('endereco').get('cep').value);

    expect(component.form.get('endereco').get('complemento').value).toBe(viaCep.complemento);
    expect(component.form.get('endereco').get('logradouro').value).toBe(viaCep.logradouro);
    expect(component.form.get('endereco').get('estado').value).toBe(viaCep.uf);
    expect(component.form.get('endereco').get('bairro').value).toBe(viaCep.bairro);
  });

  it('Deve chamar o serviço de update ao clicar no botão salvar caso o formulário for de edição e navegar para listagem de fornecedores', () => {
    spyOn(router, 'navigateByUrl');
    component.fornecedor = fornecedor;
    component.ngOnInit();
    component.onSubmit();
    expect(fornecedorService.update).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith(FORNECEDOR_CONFIG.pathFront);
  });

  it('Deve abrir modal do mapa', () => {
    spyOn(component.modalMapa,  'open');
    component.verMapa();
    expect(component.modalMapa.open).toHaveBeenCalled();
  });

  it('Deve setar valor da cidade corretamente caso formulário for de edição', () => {
    spyOn(component, 'isEdit').and.returnValue(true);
    component.fornecedor = fornecedor;
    component.form.get('endereco').get('estado').setValue('PR');
    expect(component.form.get('endereco').get('cidade').value).toBe(3550308);
  });

  it('Deve setar valor da cidade corretamente caso formulário for de criação', () => {
    spyOn(component, 'isEdit').and.returnValue(false);
    component.cidade = 3550308;
    component.fornecedor = null;
    component.form.get('endereco').get('estado').setValue('SC');
    expect(component.form.get('endereco').get('cidade').value).toBe(3550308);
  });

});
