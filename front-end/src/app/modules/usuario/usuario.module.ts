import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDialogModule, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { UsuarioNovoComponent } from './pages/usuario-novo/usuario-novo.component';
import { UsuarioPerfilComponent } from './pages/usuario-perfil/usuario-perfil.component';
import { UsuarioNovoGuard } from './services/usuario-novo.guard';
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
  providers: [UsuarioService, UsuarioNovoGuard],
})
export class UsuarioModule {}
