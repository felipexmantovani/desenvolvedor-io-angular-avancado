import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PoMenuItem } from '@po-ui/ng-components';
import { StringUtil } from '../../../../shared/utils/string.util';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { USUARIO_CONFIG } from '../../../usuario/usuario.config';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrls: ['./layout-base.component.scss']
})
export class LayoutBaseComponent {
  readonly logo = './assets/logo/po_white.svg';

  private maxShortLabel = 5;

  readonly menu: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: '/home',
      icon: 'po-icon-home',
      shortLabel: StringUtil.resume('Home', this.maxShortLabel, true)
    },
    {
      label: FORNECEDOR_CONFIG.namePlural,
      link: FORNECEDOR_CONFIG.pathFront,
      icon: 'po-icon-truck',
      shortLabel: StringUtil.resume(FORNECEDOR_CONFIG.namePlural, this.maxShortLabel, true)
    },
    {
      label: 'Produtos',
      link: '/produtos',
      icon: 'po-icon-database',
      shortLabel: StringUtil.resume('Produtos', this.maxShortLabel, true)
    },
  ];

  constructor(private router: Router) {}

  public goUsuario(): void {
    this.router.navigateByUrl(USUARIO_CONFIG.pathFront);
  }

  public goLogin(): void {}

  public goNewAccount(): void {
    this.router.navigateByUrl(`${USUARIO_CONFIG.pathFront}/novo`);
  }
}
