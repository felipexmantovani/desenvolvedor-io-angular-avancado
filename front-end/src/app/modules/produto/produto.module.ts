import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { ProdutoListarComponent } from './pages/produto-listar/produto-listar.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoReadResolver } from './resolvers/produto-read.resolver';
import { ProdutoService } from './services/produto.service';

@NgModule({
  declarations: [ProdutoListarComponent],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    HttpCustomInterceptorModule,
    PoTableModule,
    PoPageModule
  ],
  providers: [ProdutoService, ProdutoReadResolver]
})
export class ProdutoModule {}
