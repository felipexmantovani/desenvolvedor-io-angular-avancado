import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { CanDeactivatePage } from '../../../../shared/interfaces/can-deactivate-page.interface';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { FormUtil } from '../../../../shared/utils/form.util';
import { AUTH_CONFIG } from '../../../auth/auth.config';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { USUARIO_CONFIG } from '../../usuario.config';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html'
})
export class UsuarioNovoComponent implements OnInit, PageDefault, CanDeactivatePage {
  public pageTitle = `Novo ${USUARIO_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public form: FormGroup;

  get passwordValid(): boolean {
    return this.form.get('password').valid;
  }

  canDeactivateTextModal = 'Realmente deseja cancelar o cadastro de usuário?';

  onSubmitForm = false;

  get passwordEquals(): boolean {
    return this.form.get('password').value === this.form.get('confirmPassword').value;
  }

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usuarioService: UsuarioService,
    private loadingService: LoadingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      FormUtil.validade(this.form);
      this.notificationService.error('Verifique o formulário.');
      return;
    }

    if (!this.passwordEquals) {
      this.notificationService.error('As senhas devem ser iguais.');
      return;
    }

    this.onSubmitForm = true;

    this.loadingService.show();

    const usuario: Usuario = this.form.value;
    this.usuarioService
      .novo(usuario)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: token => {
          this.notificationService.success(`${token.userToken.email} cadastrado com sucesso.`);
          this.router.navigateByUrl(`${AUTH_CONFIG.pathFront}/login`);
        }
      });
  }

  canDeactivate(): boolean {
    return !this.form.dirty || this.onSubmitForm;
  }
}
