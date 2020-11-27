import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PoLoadingModule } from '@po-ui/ng-components';
import { LoadingComponent } from './loading.component';

describe('loading.component.spec | LoadingComponent', () => {
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent],
        imports: [CommonModule, PoLoadingModule],
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve iniciar escondendo o loading', () => {
    expect(component.showLoading).toBeFalsy();
  });

  it('Deve ter o texto padrão como "Aguarde..."', () => {
    expect(component.text).toBe('Aguarde...');
  });
});
