import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { PageDefault } from '../../../shared/interfaces/page-default.interface';
import { ExceptionService } from '../../../shared/services/exception/exception.service';
import { NotificationService } from '../../../shared/services/notification/notification.service';
import { FormUtil } from '../../../shared/utils/form.util';
import { Login } from '../models/login.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html',
  styleUrls: ['./auth-login.component.scss']
})
export class AuthLoginComponent implements OnInit, PageDefault {
  pageTitle = 'Login';

  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }],
  };

  form: FormGroup;

  redirectTo: string;

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private exceptionService: ExceptionService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.redirectTo = this.activatedRoute.snapshot.queryParams['redirectTo'];
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      FormUtil.validade(this.form);
      this.notificationService.error('Verifique o formulário');
      return;
    }

    this.loadingService.show();

    const login: Login = this.form.value;
    login.email = login.email.trim();
    login.password = login.password.trim();
    this.authService
      .login(login)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe({
        next: (token) => {
          this.authService.setTokenLocalStorage(token);
          this.notificationService.success('Olá, seja bem-vindo(a).');
          this.redirectTo ? this.router.navigateByUrl(this.redirectTo) : this.router.navigateByUrl('/');
        },
        error: (error) => this.exceptionService.handleError(error)
      });
  }
}
