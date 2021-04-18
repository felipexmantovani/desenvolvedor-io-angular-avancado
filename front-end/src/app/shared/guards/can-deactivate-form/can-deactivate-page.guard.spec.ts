import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { CanDeactivatePageGuard } from './can-deactivate-page.guard';
import { CanDeactivatePage } from '../../interfaces/can-deactivate-page.interface';

@Component({
  selector: 'app-mock-component',
  template: ''
})
class MockComponent implements CanDeactivatePage {
  canDeactivateTextModal: string;

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

describe('can-deactivate-page.guard.spec | CanDeactivatePageGuard', () => {
  let guard: CanDeactivatePageGuard;
  let fixture: ComponentFixture<MockComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          PoDialogService
        ]
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(CanDeactivatePageGuard);
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
