import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivatePageGuard } from '../../shared/guards/can-deactivate-form/can-deactivate-page.guard';
import { AuthGuard } from '../auth/guards/auth.guard';
import { LoginGuard } from '../auth/guards/login.guard';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';

export const routes: Routes = [
  {
    path: 'novo',
    canActivate: [LoginGuard],
    canDeactivate: [CanDeactivatePageGuard],
    component: UsuarioNovoComponent
  },
  {
    path: 'perfil',
    canActivate: [AuthGuard],
    component: UsuarioPerfilComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class UsuarioRoutingModule {}
