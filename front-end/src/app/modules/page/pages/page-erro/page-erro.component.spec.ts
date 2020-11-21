import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageErroComponent } from './page-erro.component';

describe('page-erro.component.spec | PageErroComponent', () => {
  let component: PageErroComponent;
  let fixture: ComponentFixture<PageErroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageErroComponent
      ]
    });

    fixture = TestBed.createComponent(PageErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
