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
  let component: MockComponent;

  const poDialogService = jasmine.createSpyObj<PoDialogService>(['confirm']);

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        providers: [
          {
            provide: PoDialogService,
            useValue: poDialogService
          }
        ]
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(CanDeactivatePageGuard);
    fixture = TestBed.createComponent(MockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve chamar método verify() ao executar o método canDeactivate()', () => {
    spyOn(guard, 'verify');
    guard.canDeactivate(component);
    expect(guard.verify).toHaveBeenCalled();
  });

  it('Deve resolver true caso o método canDeactivate() do componente também retornar true', async () => {
    const res = await guard.verify(component);
    expect(res).toBeTrue();
  });

  it('Deve resolver true caso o usuário clique em confirmar no dialog', async () => {
    spyOn(component, 'canDeactivate').and.returnValue(false);
    const promise = guard.verify(component);
    promise.then(value => expect(value).toBeTrue());
    guard.optionsDialog.confirm();
  });

  it('Deve resolver false caso o usuário clique em cancelar no dialog', async () => {
    spyOn(component, 'canDeactivate').and.returnValue(false);
    const promise = guard.verify(component);
    promise.then(value => expect(value).toBeFalse());
    guard.optionsDialog.cancel();
  });

});
