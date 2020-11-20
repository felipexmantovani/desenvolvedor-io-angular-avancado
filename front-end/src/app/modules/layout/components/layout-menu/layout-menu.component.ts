import { Component } from '@angular/core';
import { PoMenuItem } from '@po-ui/ng-components';

@Component({
  selector: 'app-layout-menu',
  templateUrl: './layout-menu.component.html'
})
export class LayoutMenuComponent {
  readonly menu: Array<PoMenuItem> = [
    { label: 'Home', link: '/', icon: 'po-icon-home' },
    { label: 'Fornecedores', link: '/fornecedores', icon: 'po-icon-truck' },
    { label: 'Produtos', link: '/produtos', icon: 'po-icon-database' },
  ];
}
