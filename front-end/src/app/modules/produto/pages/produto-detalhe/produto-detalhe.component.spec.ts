import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ProdutoDetalheComponent } from './produto-detalhe.component';

describe('produto-detalhe.component.spec | ProdutoDetalheComponent', () => {
  let component: ProdutoDetalheComponent;
  let fixture: ComponentFixture<ProdutoDetalheComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ProdutoDetalheComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutoDetalheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
