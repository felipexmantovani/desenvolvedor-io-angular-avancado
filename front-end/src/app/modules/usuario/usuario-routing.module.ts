import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';

const routes: Routes = [
  {
    path: 'novo',
    component: UsuarioNovoComponent
  },
  { path: '', redirectTo: '/novo', pathMatch: 'full' }
]

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule {}
