import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorNovoComponent } from './fornecedor-novo.component';

describe('fornecedor-novo.component.spec | FornecedorNovoComponent', () => {
  let component: FornecedorNovoComponent;
  let fixture: ComponentFixture<FornecedorNovoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          RouterTestingModule
        ],
        declarations: [FornecedorNovoComponent],
        providers: [FormBuilder],
        schemas: [CUSTOM_ELEMENTS_SCHEMA]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve criar o título da página corretamente', () => {
    expect(component.pageTitle).toBe(`Novo ${FORNECEDOR_CONFIG.name}`);
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
});
