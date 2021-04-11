import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule } from '@po-ui/ng-components';
import { of } from 'rxjs';
import { PRODUTO_MOCK } from '../../../../mocks/produto.mock';
import { ProdutoService } from '../../services/produto.service';
import { ProdutoFormComponent } from './produto-form.component';

describe('produto-form.component.spec | ProdutoFormComponent', () => {
  let component: ProdutoFormComponent;
  let fixture: ComponentFixture<ProdutoFormComponent>;

  const produtoService = jasmine.createSpyObj<ProdutoService>(['create', 'update']);
  produtoService.create.and.returnValue(of(PRODUTO_MOCK[0]));
  produtoService.update.and.returnValue(of(PRODUTO_MOCK[0]));

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
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
