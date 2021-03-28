import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { PageDefault } from '../../../shared/interfaces/page-default.interface';
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

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService,
    private exceptionService: ExceptionService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    this.loadingService.show();

    const login: Login = this.form.value;
    login.email = login.email.trim();
    login.password = login.password.trim();
    this.authService
      .login(login)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(
        (token) => {
          this.authService.setTokenLocalStorage(token);
          this.notificationService.success('Olá, seja bem-vindo(a).');
          this.router.navigateByUrl('/');
        },
        (error) => this.exceptionService.handleError(error)
      );
  }
}
