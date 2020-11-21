import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { StringUtil } from '../../../../shared/utils/string.util';
import { FORNECEDORES_CONFIG } from '../../../fornecedor/fornecedor.config';

@Component({
  selector: 'app-layout-base',
  templateUrl: './layout-base.component.html',
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
      label: FORNECEDORES_CONFIG.namePlural,
      link: FORNECEDORES_CONFIG.pathFront,
      icon: 'po-icon-truck',
      shortLabel: StringUtil.resume(FORNECEDORES_CONFIG.namePlural, 5, true)
    },
    {
      label: 'Produtos',
      link: '/produtos',
      icon: 'po-icon-database',
      shortLabel: StringUtil.resume('Produtos', 5, true)
    },
  ];

  constructor() {}
}
