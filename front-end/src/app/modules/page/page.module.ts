import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoChartModule, PoPageModule } from '@po-ui/ng-components';
import { PageHomeRoutingModule } from './page-routing.module';
import { PageErroComponent } from './pages/page-erro/page-erro.component';
import { PageHomeComponent } from './pages/page-home/page-home.component';

@NgModule({
  declarations: [PageHomeComponent, PageErroComponent],
  imports: [CommonModule, PageHomeRoutingModule, PoPageModule, PoChartModule],
})
export class PageModule {}
