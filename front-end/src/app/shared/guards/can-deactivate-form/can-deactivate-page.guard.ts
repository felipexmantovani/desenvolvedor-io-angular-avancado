import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { CanDeactivatePage } from '../../interfaces/can-deactivate-page.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivatePageGuard implements CanDeactivate<CanDeactivatePage> {

  optionsDialog: PoDialogConfirmOptions;

  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: CanDeactivatePage): Promise<boolean> {
    return await this.verify(component);
  }

  verify(component: CanDeactivatePage): Promise<boolean> {
    return new Promise((resolve) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        this.optionsDialog = {
          title: 'Confirmação!',
          message: component.canDeactivateTextModal,
          confirm: () => resolve(true),
          cancel: () => resolve(false)
        };
        this.poDialogService.confirm(this.optionsDialog);
      }
    });
  }

}
