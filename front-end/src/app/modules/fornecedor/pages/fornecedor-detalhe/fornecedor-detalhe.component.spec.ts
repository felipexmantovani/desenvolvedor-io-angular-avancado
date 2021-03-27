import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PoPageModule } from '@po-ui/ng-components';
import { FORNECEDOR_MOCK } from '../../../../mocks/fornecedor.mock';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorDetalheComponent } from './fornecedor-detalhe.component';

describe('fornecedor-detalhe.component.spec | FornecedorDetalheComponent', () => {
  let component: FornecedorDetalheComponent;
  let fixture: ComponentFixture<FornecedorDetalheComponent>;

  const activatedRouteMock = {
    snapshot: {
      data: {
        fornecedor: FORNECEDOR_MOCK[1]
      }
    }
  };

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FornecedorDetalheComponent],
        imports: [RouterTestingModule, HttpClientTestingModule, PoPageModule],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: activatedRouteMock
          }
        ],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o título da página corretamente', () => {
    expect(component.pageTitle).toBe(FORNECEDOR_MOCK[1].nome);
  });

  it('Deve criar o breadcrumb corretamente', () => {
    expect(component.breadcrumb).toBeTruthy();
    expect(component.breadcrumb.items[0].label).toBe('Home');
    expect(component.breadcrumb.items[0].link).toBe('/');
    expect(component.breadcrumb.items[1].label).toBe(FORNECEDOR_CONFIG.namePlural);
    expect(component.breadcrumb.items[1].link).toBe(FORNECEDOR_CONFIG.pathFront);
    expect(component.breadcrumb.items[2].label).toBe(component.pageTitle);
  });
});
