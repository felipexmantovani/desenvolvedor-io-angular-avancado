import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorDetalheComponent } from './pages/fornecedor-detalhe/fornecedor-detalhe.component';
import { FornecedorListarComponent } from './pages/fornecedor-listar/fornecedor-listar.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorGetByIdResolver } from './resolvers/fornecedor-get-by-id.resolver';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';

export const routes: Routes = [
  {
    path: '',
    component: FornecedorListarComponent,
    resolve: {
      fornecedores: FornecedorReadResolver,
    },
  },
  {
    path: 'novo',
    canActivate: [AuthGuard],
    canDeactivate: [FornecedorNovoGuard],
    component: FornecedorNovoComponent,
  },
  {
    path: 'detalhe/:id',
    component: FornecedorDetalheComponent,
    resolve: {
      fornecedor: FornecedorGetByIdResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FornecedorRoutingModule {}
