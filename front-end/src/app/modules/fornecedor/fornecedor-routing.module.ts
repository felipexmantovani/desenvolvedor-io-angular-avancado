import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FornecedorNovoComponent } from './pages/fornecedor-novo/fornecedor-novo.component';

const routes: Routes = [
  {
    path: 'novo',
    component: FornecedorNovoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
})
export class FornecedorRoutingModule {}
