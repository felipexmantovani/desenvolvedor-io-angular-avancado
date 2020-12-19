import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorNovoGuard } from './guards/fornecedor-novo.guard';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';

const routes: Routes = [
  {
    path: 'novo',
    canDeactivate: [FornecedorNovoGuard],
    component: FornecedorNovoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FornecedorRoutingModule {}
