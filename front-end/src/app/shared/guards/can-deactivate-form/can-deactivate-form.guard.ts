import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { CanDeactivateGuard } from '../../interfaces/can-deactivate-form.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivateFormGuard implements CanDeactivate<CanDeactivateGuard> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: CanDeactivateGuard): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: CanDeactivateGuard): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        const options: PoDialogConfirmOptions = {
          title: 'Confirmação!',
          message: component.canDeactivateTextModal,
          confirm: () => {
            resolve(true);
          },
          cancel: () => {
            resolve(false);
          }
        };
        this.poDialogService.confirm(options);
      }
    });
  }
}