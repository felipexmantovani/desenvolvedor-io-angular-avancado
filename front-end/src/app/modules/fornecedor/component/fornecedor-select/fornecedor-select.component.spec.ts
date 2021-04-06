import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FornecedorSelectComponent } from './fornecedor-select.component';

describe('fornecedor-select.component.spec | FornecedorSelectComponent', () => {
  let component: FornecedorSelectComponent;
  let fixture: ComponentFixture<FornecedorSelectComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FornecedorSelectComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FornecedorSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
