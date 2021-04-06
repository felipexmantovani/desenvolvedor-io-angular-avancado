import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { ProdutoListarComponent } from './pages/produto-listar/produto-listar.component';
import { ProdutoReadResolver } from './resolvers/produto-read.resolver';

export const routes: Routes = [
  {
    path: '',
    component: ProdutoListarComponent,
    canActivate: [AuthGuard],
    resolve: {
      produtos: ProdutoReadResolver,
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class ProdutoRoutingModule {}
