import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PageHomeComponent } from './page-home.component';

describe('page-home.component.spec | PageHomeComponent', () => {
  let component: PageHomeComponent;
  let fixture: ComponentFixture<PageHomeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        PageHomeComponent
      ]
    });

    fixture = TestBed.createComponent(PageHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
