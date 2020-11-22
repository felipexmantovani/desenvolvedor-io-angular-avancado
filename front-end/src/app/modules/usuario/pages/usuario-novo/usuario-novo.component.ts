import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoPageAction } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
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

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
    this.getActions();
    this.subs.push(
      this.form.valueChanges.subscribe(() => this.getActions())
    );
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(6)]]
    });
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
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
      // mensagem
      return;
    }
    // api
  }
}
