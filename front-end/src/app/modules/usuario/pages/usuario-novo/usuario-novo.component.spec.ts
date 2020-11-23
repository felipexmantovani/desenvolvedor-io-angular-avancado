import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { UsuarioService } from '../../services/usuario.service';
import { UsuarioNovoComponent } from './usuario-novo.component';

describe('usuario-novo.component.spec | UsuarioNovoComponent', () => {
  let component: UsuarioNovoComponent;
  let fixture: ComponentFixture<UsuarioNovoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsuarioNovoComponent],
      imports: [RouterTestingModule, PoPageModule, PoFieldModule],
      providers: [FormBuilder, UsuarioService],
    });

    fixture = TestBed.createComponent(UsuarioNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(component).toBeTruthy();
  });
});
