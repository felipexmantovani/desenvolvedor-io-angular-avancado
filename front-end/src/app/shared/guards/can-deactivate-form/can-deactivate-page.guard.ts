import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { CanDeactivatePage } from '../../interfaces/can-deactivate-page.interface';

@Injectable({
  providedIn: 'root'
})
export class CanDeactivatePageGuard implements CanDeactivate<CanDeactivatePage> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: CanDeactivatePage): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: CanDeactivatePage): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (component.canDeactivate()) {
        resolve(true);
      } else {
        const options: PoDialogConfirmOptions = {
          title: 'Confirmação!',
          message: component.canDeactivateTextModal,
          confirm: () => resolve(true),
          cancel: () => resolve(false)
        };
        this.poDialogService.confirm(options);
      }
    });
  }
}
