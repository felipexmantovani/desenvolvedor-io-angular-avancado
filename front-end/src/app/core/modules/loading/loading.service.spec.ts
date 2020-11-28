import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { LoadingService } from './loading.service';

describe('loading.service.spec | LoadingService', () => {
  let service: LoadingService;
  let component: LoadingComponent;
  let fixture: ComponentFixture<LoadingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [LoadingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    service = TestBed.inject(LoadingService);
    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(service).toBeTruthy();
  });

  it('Deve mostrar e esconder o loading', () => {
    component.loadingService.loadingBS.subscribe((value) => {
      component.showLoading = value;
    });
    expect(component.showLoading).toBeFalsy();
    service.show();
    expect(component.showLoading).toBeTruthy();
    service.hide();
    expect(component.showLoading).toBeFalsy();
  });
});
