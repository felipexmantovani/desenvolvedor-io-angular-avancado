import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { NavigationStart, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { LayoutComponentsModule } from './modules/layout/components/layout-component.module';
import { StorageService } from './shared/services/storage/storage.service';

class MockRouter {
  public navigationStart = new NavigationStart(0, '/mock-rota');
  public events = new Observable(observer => {
    observer.next(this.navigationStart);
    observer.complete();
  });
}

describe('app.component.spec | AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  const storageService = jasmine.createSpyObj<StorageService>(['localSetItem']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [AppComponent],
        imports: [
          BrowserModule,
          LayoutComponentsModule,
          RouterTestingModule,
          CoreModule,
        ],
        providers: [
          {
            provide: Router,
            useClass: MockRouter,
          },
          {
            provide: StorageService,
            useValue: storageService,
          },
        ],
      });
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });

  it('Deve setar no localstorage a rota requisitada', () => {
    expect(storageService.localSetItem).toHaveBeenCalled();
  });
});
