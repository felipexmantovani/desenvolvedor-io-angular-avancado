import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PoPageModule, PoTableModule } from '@po-ui/ng-components';
import { HttpCustomInterceptorModule } from '../../core/modules/http-custom-interceptor/http-custom-interceptor.module';
import { ProdutoComponentModule } from './components/produto-component.module';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { ProdutoListarComponent } from './pages/produto-listar/produto-listar.component';
import { ProdutoNovoComponent } from './pages/produto-novo/produto-novo.component';
import { ProdutoRoutingModule } from './produto-routing.module';
import { ProdutoGetByIdResolver } from './resolvers/produto-get-by-id.resolver';
import { ProdutoReadResolver } from './resolvers/produto-read.resolver';
import { ProdutoService } from './services/produto.service';

@NgModule({
  declarations: [
    ProdutoListarComponent,
    ProdutoDetalheComponent,
    ProdutoNovoComponent
  ],
  imports: [
    CommonModule,
    ProdutoRoutingModule,
    ProdutoComponentModule,
    HttpCustomInterceptorModule,
    PoTableModule,
    PoPageModule
  ],
  providers: [ProdutoService, ProdutoReadResolver, ProdutoGetByIdResolver]
})
export class ProdutoModule {}
