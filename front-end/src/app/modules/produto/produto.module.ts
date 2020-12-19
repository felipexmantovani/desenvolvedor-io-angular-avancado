import { NgModule } from '@angular/core';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { ProdutoRoutingModule } from './produto-routing.module';

@NgModule({
  imports: [ProdutoRoutingModule, HttpCustomInterceptorModule],
})
export class ProdutoModule {}
