import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { FORNECEDOR_MOCK } from '../../../../mocks/fornecedor.mock';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorListarComponent } from './fornecedor-listar.component';

describe('fornecedor-listar.component.spec | FornecedorListarComponent', () => {
  let component: FornecedorListarComponent;
  let fixture: ComponentFixture<FornecedorListarComponent>;

  const activatedRoute = {
    snapshot: {
      data: {
        fornecedores: FORNECEDOR_MOCK
      }
    }
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FornecedorListarComponent],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ],
        providers: [
          FornecedorService,
          PoDialogService,
          {
            provide: ActivatedRoute,
            useValue: activatedRoute
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorListarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o título da página corretamente', () => {
    expect(component.pageTitle).toBe(FORNECEDOR_CONFIG.namePlural);
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb).toBeTruthy();
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe(component.pageTitle);
  });

  it('Deve carregar as actions da página caso usuário esteja logado', () => {
    component.isLogged = true;
    component.getActionsPage();
    expect(component.actionsPage).toBeTruthy();
  });
});
