import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoModule } from '@po-ui/ng-components';
import { LayoutBaseComponent } from './layout-base/layout-base.component';
import { LayoutMenuComponent } from './layout-menu/layout-menu.component';

@NgModule({
  declarations: [LayoutBaseComponent, LayoutMenuComponent],
  imports: [CommonModule, PoModule, RouterModule],
  exports: [LayoutBaseComponent],
})
export class LayoutComponentsModule {}
