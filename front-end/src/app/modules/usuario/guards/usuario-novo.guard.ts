import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService } from '@po-ui/ng-components';
import { UsuarioNovoComponent } from '../pages/usuario-novo/usuario-novo.component';

@Injectable()
export class UsuarioNovoGuard implements CanDeactivate<UsuarioNovoComponent> {
  constructor(public poDialogService: PoDialogService) {}

  async canDeactivate(component: UsuarioNovoComponent): Promise<boolean> {
    return await this.verify(component);
  }

  private verify(component: UsuarioNovoComponent): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!component.form.dirty) {
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