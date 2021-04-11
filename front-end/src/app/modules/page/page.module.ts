import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule, PoWidgetModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { PageErroComponent } from './page-erro/page-erro.component';
import { PageHomeComponent } from './page-home/page-home.component';
import { PageHomeRoutingModule } from './page-routing.module';

@NgModule({
  declarations: [
    PageHomeComponent,
    PageErroComponent
  ],
  imports: [
    CommonModule,
    PageHomeRoutingModule,
    PoPageModule,
    PoWidgetModule,
    HttpCustomInterceptorModule
  ]
})
export class PageModule {}
