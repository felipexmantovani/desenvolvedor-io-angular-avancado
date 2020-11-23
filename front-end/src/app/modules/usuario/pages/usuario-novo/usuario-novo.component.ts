import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { LoadingService } from '../../../../core/services/loading/loading.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { Usuario } from '../../models/usuario.interface';
import { UsuarioService } from '../../services/usuario.service';
import { USUARIO_CONFIG } from '../../usuario.config';

@Component({
  selector: 'app-usuario-novo',
  templateUrl: './usuario-novo.component.html'
})
export class UsuarioNovoComponent implements OnInit, OnDestroy, PageDefault {
  public pageTitle = `Novo ${USUARIO_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public actions: Array<PoPageAction>;

  public form: FormGroup;

  private subs: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private usuarioService: UsuarioService,
    private exceptionService: ExceptionService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getActions();
    this.subs.push(
      this.form.valueChanges.subscribe(() => this.getActions())
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]]
    });
  }

  private getActions(): void {
    this.actions = [
      { label: 'Enviar', action: this.onSubmit.bind(this), disabled: !this.form.valid }
    ];
  }

  get passwordValid(): boolean {
    return this.form.get('password').valid;
  }

  private passwordEquals(): boolean {
    return this.form.get('password').value === this.form.get('confirmPassword').value;
  }

  private onSubmit(): void {
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
        },
        (error) => this.exceptionService.handleError(error)
      );
  }
}
