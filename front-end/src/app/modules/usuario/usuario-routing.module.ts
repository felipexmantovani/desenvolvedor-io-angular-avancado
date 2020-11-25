import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';
import { UsuarioNovoGuard } from './services/usuario-novo.guard';

export const routes: Routes = [
  {
    path: '',
    component: UsuarioPerfilComponent
  },
  {
    path: 'novo',
    canDeactivate: [UsuarioNovoGuard],
    component: UsuarioNovoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule {}
