import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { StringUtil } from '../../../../shared/utils/string.util';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
  styleUrls: ['./layout-base.component.scss']
})
export class LayoutBaseComponent {
  readonly logo = './assets/logo/po_white.svg';

  readonly menu: Array<PoMenuItem> = [
    {
      label: 'Home',
      link: '/home',
      icon: 'po-icon-home',
      shortLabel: 'Home'
    },
    {
      label: FORNECEDOR_CONFIG.namePlural,
      link: FORNECEDOR_CONFIG.pathFront,
      icon: 'po-icon-truck',
      shortLabel: StringUtil.resume(FORNECEDOR_CONFIG.namePlural, 5, true)
    },
    {
      label: 'Produtos',
      link: '/produtos',
      icon: 'po-icon-database',
      shortLabel: StringUtil.resume('Produtos', 5, true)
    },
  ];

  constructor() {}

  public goLogin(): void {}

  public goNewAccount(): void {}
}
