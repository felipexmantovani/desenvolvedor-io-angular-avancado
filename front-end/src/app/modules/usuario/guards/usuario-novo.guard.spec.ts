import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { PoButtonModule, PoDialogService, PoFieldModule, PoPageModule } from '@po-ui/ng-components';
import { UsuarioNovoComponent } from '../pages/usuario-novo/usuario-novo.component';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioNovoGuard } from './usuario-novo.guard';

describe('usuario-novo.guard.spec | UsuarioNovoGuard', () => {
  let guard: UsuarioNovoGuard;
  let component: UsuarioNovoComponent;
  let fixture: ComponentFixture<UsuarioNovoComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientTestingModule,
          PoFieldModule,
          PoPageModule,
          RouterTestingModule,
          PoButtonModule,
          ReactiveFormsModule
        ],
        declarations: [UsuarioNovoComponent],
        providers: [
          UsuarioNovoGuard,
          PoDialogService,
          FormBuilder,
          UsuarioService,
        ],
      });
    })
  );

  beforeEach(() => {
    guard = TestBed.inject(UsuarioNovoGuard);
    fixture = TestBed.createComponent(UsuarioNovoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Deve ser criado', () => {
    expect(guard).toBeTruthy();
  });

  it('Deve retornar true caso o formulário não estiver dirty', () => {
    const verify = guard.canDeactivate(component);
    expect(verify).toBeTruthy();
  });

  it('Deve chamar método verify() ao chamar o canDeactivate()', () => {
    const spy = spyOn<any>(guard, 'verify');
    guard.canDeactivate(component);
    expect(spy).toHaveBeenCalled();
  });

  // TO-DO
  // it('Deve retornar true caso usuário clique em Confirmar', async () => {
  //   component.form.markAsDirty();
  //   const verify = await guard['verify'](component).then((value) => {
  //     guard.options.confirm();
  //     return value;
  //   });
  // });
});
