import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoFieldModule, PoPageModule } from '@po-ui/ng-components';
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
    PoFieldModule,
  ],
  providers: [UsuarioService],
})
export class UsuarioModule {}
