import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProdutoDetalheComponent } from './pages/produto-detalhe/produto-detalhe.component';
import { ProdutoListarComponent } from './pages/produto-listar/produto-listar.component';
import { ProdutoNovoComponent } from './pages/produto-novo/produto-novo.component';
import { ProdutoGetByIdResolver } from './resolvers/produto-get-by-id.resolver';
import { ProdutoReadResolver } from './resolvers/produto-read.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProdutoListarComponent,
    resolve: {
      produtos: ProdutoReadResolver,
    }
  },
  {
    path: 'novo',
    component: ProdutoNovoComponent
  },
  {
    path: 'detalhe/:id',
    component: ProdutoDetalheComponent,
    resolve: {
      produto: ProdutoGetByIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProdutoRoutingModule {}
