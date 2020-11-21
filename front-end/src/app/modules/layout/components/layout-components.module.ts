import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PoAvatarModule, PoButtonModule, PoMenuModule } from '@po-ui/ng-components';
import { LayoutBaseComponent } from './layout-base/layout-base.component';

@NgModule({
  declarations: [LayoutBaseComponent],
  imports: [CommonModule, PoMenuModule, PoAvatarModule, PoButtonModule, RouterModule],
  exports: [LayoutBaseComponent],
})
export class LayoutComponentsModule {}
