import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { FornecedorNovoComponent } from '../pages/fornecedor-novo/fornecedor-novo.component';

@Injectable()
export class FornecedorNovoGuard implements CanDeactivate<FornecedorNovoComponent> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: FornecedorNovoComponent): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: FornecedorNovoComponent): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!component.formComponent.form.dirty || component.formComponent.fornecedor?.id) {
        resolve(true);
      } else {
        const options: PoDialogConfirmOptions = {
          title: 'Confirmação!',
          message: 'Realmente deseja sair desta página e cancelar o cadastro?',
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
