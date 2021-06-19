import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { FORNECEDOR_MOCK } from '../../../../../../mocks/fornecedor/fornecedor.mock';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorService } from '../../services/fornecedor.service';
import { FornecedorListarComponent } from './fornecedor-listar.component';

describe('fornecedor-listar.component.spec | FornecedorListarComponent', () => {
  let component: FornecedorListarComponent;
  let fixture: ComponentFixture<FornecedorListarComponent>;
  let router: Router;

  const activatedRoute = {
    snapshot: {
      data: {
        fornecedores: FORNECEDOR_MOCK
      }
    }
  };

  const fornecedor = FORNECEDOR_MOCK[0];

  const fornecedorService = jasmine.createSpyObj<FornecedorService>(['delete', 'read']);
  fornecedorService.delete.and.returnValue(of(fornecedor));
  fornecedorService.read.and.returnValue(of(FORNECEDOR_MOCK));

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FornecedorListarComponent],
        imports: [
          RouterTestingModule,
          HttpClientTestingModule
        ],
        providers: [
          PoDialogService,
          {
            provide: ActivatedRoute,
            useValue: activatedRoute
          },
          {
            provide: FornecedorService,
            useValue: fornecedorService
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorListarComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();

    component.isLogged = false;
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
    expect(component.actionsPage.length).toBe(1);
    expect(component.actionsPage[0].label).toBe(`Novo ${FORNECEDOR_CONFIG.name}`);
    expect(component.actionsPage[0].icon).toBe('po-icon-plus');
    expect(component.actionsPage[0].url).toBe(`${FORNECEDOR_CONFIG.pathFront}/novo`);
  });

  it('Deve carregar as ações da grid corretamente caso usuário estiver logado', () => {
    component.isLogged = true;
    component.getActionsTable();
    expect(component.actionsTable.length).toBe(2);
    expect(component.actionsTable[0].label).toBe('Detalhes');
    expect(component.actionsTable[0].icon).toBe('po-icon-eye');
    expect(component.actionsTable[1].label).toBe('Excluir');
    expect(component.actionsTable[1].icon).toBe('po-icon-delete');
  });

  it('Deve navegar para a tela de detalhe do fornecedor', () => {
    spyOn(router, 'navigateByUrl');
    component.detalhes(fornecedor);
    expect(router.navigateByUrl).toHaveBeenCalledWith(`${FORNECEDOR_CONFIG.pathFront}/detalhe/${fornecedor.id}`);
  });

  it('Deve carregar os fornecedores após a exclusão de um registro', () => {
    component.excluir(fornecedor);
    component.optionsDialogConfirm.confirm();
    expect(fornecedorService.delete).toHaveBeenCalled();
    expect(fornecedorService.read).toHaveBeenCalled();
  });

  it('Deve executar o método setAtivosInativos() após realizar pesquisa rápida com filtro válido ou inválido', () => {
    spyOn(component, 'setAtivosInativos');

    component.onQuickSearch('teste');
    expect(component.setAtivosInativos).toHaveBeenCalled();

    component.onQuickSearch('');
    expect(component.setAtivosInativos).toHaveBeenCalled();
  });
});
