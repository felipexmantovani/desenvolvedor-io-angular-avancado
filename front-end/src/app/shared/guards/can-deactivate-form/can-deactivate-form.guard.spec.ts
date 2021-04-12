import { Component } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { PoDialogService } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { CanDeactivateFormGuard } from './can-deactivate-form.guard';
import { CanDeactivateGuard } from '../../interfaces/can-deactivate-form.interface';

@Component({
  selector: 'app-mock-component',
  template: ''
})
class MockComponent implements CanDeactivateGuard {
  canDeactivateTextModal: string;

  canDeactivate(): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

describe('can-deactivate-form.guard.spec | CanDeactivateFormGuard', () => {
  let guard: CanDeactivateFormGuard;
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
    guard = TestBed.inject(CanDeactivateFormGuard);
    fixture = TestBed.createComponent(MockComponent);
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });
});
