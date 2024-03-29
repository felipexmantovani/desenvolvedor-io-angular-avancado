import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PageErroComponent } from './page-erro.component';

describe('page-erro.component.spec | PageErroComponent', () => {
  let component: PageErroComponent;
  let fixture: ComponentFixture<PageErroComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PageErroComponent],
      imports: [RouterTestingModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA]
    });

    fixture = TestBed.createComponent(PageErroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
