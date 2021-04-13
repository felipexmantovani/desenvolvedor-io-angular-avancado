import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { CanDeactivateGuard } from '../../../../shared/interfaces/can-deactivate-form.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { USUARIO_CONFIG } from '../../usuario.config';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html'
})
export class UsuarioNovoComponent implements OnInit, PageDefault, CanDeactivateGuard {
  public pageTitle = `Novo ${USUARIO_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public form: FormGroup;

  get passwordValid(): boolean {
    return this.form.get('password').valid;
  }

  canDeactivateTextModal = 'Realmente deseja cancelar o cadastro de usuário?';

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]]
    });
  }

  passwordEquals(): boolean {
    return this.form.get('password').value === this.form.get('confirmPassword').value;
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    if (!this.passwordEquals()) {
      this.notificationService.error('As senhas devem ser iguais.');
      return;
    }

    this.loadingService.show();

    const usuario: Usuario = this.form.value;
    this.usuarioService
      .novo(usuario)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(
        (token) => {
          this.notificationService.success(`${token.userToken.email} cadastrado com sucesso.`);
          this.form.reset();
        }
      );
  }

  canDeactivate(): boolean {
    return !this.form.dirty;
  }
}
