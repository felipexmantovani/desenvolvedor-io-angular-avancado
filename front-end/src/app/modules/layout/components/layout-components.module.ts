import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoMenuModule } from '@po-ui/ng-components';
import { LayoutBaseComponent } from './layout-base/layout-base.component';

@NgModule({
  declarations: [LayoutBaseComponent],
  imports: [CommonModule, PoMenuModule, RouterModule],
  exports: [LayoutBaseComponent],
})
export class LayoutComponentsModule {}
