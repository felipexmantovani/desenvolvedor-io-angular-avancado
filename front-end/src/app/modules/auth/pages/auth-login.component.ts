import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../core/modules/loading/loading.service';
import { ExceptionService } from '../../../core/services/exception/exception.service';
import { NotificationService } from '../../../core/services/notification/notification.service';
import { PageDefault } from '../../../shared/interfaces/page-default.interface';
import { Login } from '../models/login.interface';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth-login',
  templateUrl: './auth-login.component.html'
})
export class AuthLoginComponent implements OnInit, OnDestroy, PageDefault {
  public pageTitle = 'Login';

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }],
  };

  public form: FormGroup;

  private subs: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private authService: AuthService,
    private exceptionService: ExceptionService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.createForm();
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private createForm(): void {
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

  public onSubmit(): void {
    this.loadingService.show();

    const login: Login = this.form.value;
    this.authService
      .login(login)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(
        (token) => {
          this.authService.setToken(token);
          this.notificationService.success('Olá, seja bem-vindo(a).');
          this.router.navigateByUrl('/');
        },
        (error) => this.exceptionService.handleError(error)
      );
  }
}
