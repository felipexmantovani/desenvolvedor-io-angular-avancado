import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { FornecedorGridComponent } from './fornecedor-grid.component';

describe('fornecedor-grid.component.spec | FornecedorGridComponent', () => {
  let component: FornecedorGridComponent;
  let fixture: ComponentFixture<FornecedorGridComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [FornecedorGridComponent],
        imports: [RouterTestingModule, HttpClientTestingModule]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorGridComponent);
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
    component['getActionsPage']();
    expect(component.actionsPage).toBeTruthy();
  });
});
