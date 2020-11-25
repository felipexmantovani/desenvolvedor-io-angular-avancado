import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../auth/guards/login.guard';
import { UsuarioNovoGuard } from './guards/usuario-novo.guard';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';

export const routes: Routes = [
  {
    path: '',
    component: UsuarioPerfilComponent
  },
  {
    path: 'novo',
    canActivate: [LoginGuard],
    canDeactivate: [UsuarioNovoGuard],
    component: UsuarioNovoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule {}
