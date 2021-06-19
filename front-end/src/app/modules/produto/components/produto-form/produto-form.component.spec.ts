import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule } from '@po-ui/ng-components';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { of } from 'rxjs';
import { PRODUTO_MOCK } from '../../../../../../mocks/produto/produto.mock';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoFormComponent } from './produto-form.component';

describe('produto-form.component.spec | ProdutoFormComponent', () => {
  let component: ProdutoFormComponent;
  let fixture: ComponentFixture<ProdutoFormComponent>;
  let router: Router;

  const produtoService = jasmine.createSpyObj<ProdutoService>(['create', 'update']);
  produtoService.create.and.returnValue(of(PRODUTO_MOCK[0]));
  produtoService.update.and.returnValue(of(PRODUTO_MOCK[0]));

  const notificationService = jasmine.createSpyObj<NotificationService>(['error', 'success']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProdutoFormComponent],
        imports: [
          HttpClientTestingModule,
          RouterTestingModule,
          ReactiveFormsModule,
          PoFieldModule
        ],
        providers: [
          FormBuilder,
          {
            provide: ProdutoService,
            useValue: produtoService
          },
          {
            provide: NotificationService,
            useValue: notificationService
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    router = TestBed.inject(Router);
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve preencher o formulário caso for de edição', () => {
    component.produto = PRODUTO_MOCK[0];
    component.createForm();
    expect(component.form.valid).toBeTrue();
  });

  it('Deve clicar no inputFile ao executar método selectImage()', () => {
    spyOn(component.inputFile.nativeElement, 'click');
    component.selectImage();
    expect(component.inputFile.nativeElement.click).toHaveBeenCalled();
  });

  it('Deve popular propriedade imageName ao executar método fileChageEvent()', () => {
    const event = {
      currentTarget: {
        files: [
          {
            name: 'nome_do_arquivo'
          }
        ]
      }
    };

    component.fileChangeEvent(event);
    expect(component.imageName).toBe('nome_do_arquivo');
  });

  it('Deve popular propriedade croppedImage ao executar método imageCropped()', () => {
    const event: ImageCroppedEvent = {
      cropperPosition: null,
      height: null,
      imagePosition: null,
      width: null,
      base64: 'base64_teste',
      offsetImagePosition: null
    };

    component.imageCropped(event);
    expect(component.croppedImage).toBe('base64_teste');
  });

  it('Deve exibir notificação de erro caso formulário estiver inválido', () => {
    component.onSubmit();
    expect(notificationService.error).toHaveBeenCalledWith('Verifique o formulário.');
  });

  it('Deve consumir service create() e navegar para listagem de produtos caso formulário não for de edição', () => {
    spyOn(router, 'navigateByUrl');
    const produto = PRODUTO_MOCK[0];
    component.form.patchValue(produto);
    component.onSubmit();
    expect(produtoService.create).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalledWith(`Produto ${produto.nome} cadastrado com sucesso.`);
    expect(router.navigateByUrl).toHaveBeenCalledWith(PRODUTO_CONFIG.pathFront);
  });

  it('Deve consumir service update() e navegar para listagem de produtos caso formulário for de edição', () => {
    spyOn(router, 'navigateByUrl');
    component.produto = PRODUTO_MOCK[0];
    component.createForm();
    component.onSubmit();
    expect(produtoService.update).toHaveBeenCalled();
    expect(notificationService.success).toHaveBeenCalledWith(`Produto ${component.produto.nome} salvo com sucesso.`);
    expect(router.navigateByUrl).toHaveBeenCalledWith(PRODUTO_CONFIG.pathFront);
  });
});
