import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../auth/guards/auth.guard';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorGridComponent } from './pages/fornecedor-grid/fornecedor-grid.component';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';
import { FornecedorReadResolver } from './resolvers/fornecedor-read.resolver';

const routes: Routes = [
  {
    path: '',
    component: FornecedorGridComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FornecedorRoutingModule {}
