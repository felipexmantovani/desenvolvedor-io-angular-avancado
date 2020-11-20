import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule } from '@po-ui/ng-components';
import { PageHomeRoutingModule } from './page-routing.module';
import { PageHomeComponent } from './pages/home/page-home.component';

@NgModule({
  declarations: [PageHomeComponent],
  imports: [CommonModule, PageHomeRoutingModule, PoPageModule],
})
export class PageModule {}
