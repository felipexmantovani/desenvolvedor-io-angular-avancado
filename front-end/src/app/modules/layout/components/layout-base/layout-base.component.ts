import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
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
      label: `${FORNECEDORES_CONFIG.namePlural}`,
      link: `${FORNECEDORES_CONFIG.pathFront}`,
      icon: 'po-icon-truck',
      shortLabel: `${FORNECEDORES_CONFIG.namePlural}`
    },
    {
      label: 'Produtos',
      link: '/produtos',
      icon: 'po-icon-database',
      shortLabel: 'Produtos'
    },
  ];

  constructor() {}
}
