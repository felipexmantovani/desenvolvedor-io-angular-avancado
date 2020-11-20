import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';
import { FORNECEDORES_CONFIG } from '../../../fornecedor/fornecedor.config';
import { PAGE_CONFIG } from '../../../page/page.config';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html'
})
export class LayoutMenuComponent {
  readonly menu: Array<PoMenuItem> = [
    { label: 'Home', link: `${PAGE_CONFIG.pathFront}/home`, icon: 'po-icon-home' },
    { label: `${FORNECEDORES_CONFIG.namePlural}`, link: `${FORNECEDORES_CONFIG.pathFront}`, icon: 'po-icon-truck' },
    { label: 'Produtos', link: '/produtos', icon: 'po-icon-database' },
  ];
}
