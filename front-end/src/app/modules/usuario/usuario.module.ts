import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDialogModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { LoginGuard } from '../auth/guards/login.guard';
import { UsuarioNovoGuard } from './guards/usuario-novo.guard';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';
import { UsuarioService } from './services/usuario.service';
import { UsuarioRoutingModule } from './usuario-routing.module';

@NgModule({
  declarations: [UsuarioNovoComponent, UsuarioPerfilComponent],
  imports: [
    UsuarioRoutingModule,
    ReactiveFormsModule,
    PoPageModule,
    PoButtonModule,
    PoFieldModule,
    PoDialogModule
  ],
  providers: [UsuarioService, UsuarioNovoGuard, LoginGuard],
})
export class UsuarioModule {}
