import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoSelectOption } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IbgeService } from '../../../../core/modules/ibge/services/ibge.service';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { ViaCepService } from '../../../../core/modules/via-cep/services/via-cep.service';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { StringUtil } from '../../../../shared/utils/string.util';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-novo',
  templateUrl: './fornecedor-novo.component.html'
})
export class FornecedorNovoComponent implements OnInit, OnDestroy, PageDefault {
  public pageTitle = `Novo ${FORNECEDOR_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' },
      { label: FORNECEDOR_CONFIG.namePlural, link: FORNECEDOR_CONFIG.pathFront },
      { label: this.pageTitle }
    ]
  };

  public actions: Array<PoPageAction>;

  public form: FormGroup;

  public estados: Array<PoSelectOption> = new Array<PoSelectOption>();

  public cidades: Array<PoSelectOption> = new Array<PoSelectOption>();

  private subs: Array<Subscription> = new Array<Subscription>();

  private pessoaFisica = '1';

  public fornecedor: Fornecedor;

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private ibgeService: IbgeService,
    private loadingService: LoadingService,
    private fornecedorService: FornecedorService,
    private notificationService: NotificationService,
    private exceptionService: ExceptionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getEstados();
    this.getActions();

    this.subs.push(
      this.form.valueChanges.subscribe(() => this.getActions()),
      this.form.get('endereco').get('estado').valueChanges.subscribe(value => {
        this.loadingService.show();
        this.cidades = new Array<PoSelectOption>();
        this.ibgeService.getMunicipios(value)
          .pipe(finalize(() => this.loadingService.hide()))
          .subscribe(municipios => {
            municipios.forEach(municipio => {
              this.cidades.push({
                label: municipio.nome,
                value: municipio.id
              });
            });
          });
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      documento: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(11)]],
      tipoFornecedor: ['1'],
      ativo: [true],
      endereco: this.formBuilder.group({
        cep: ['', [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
        logradouro: ['', [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
        numero: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        complemento: [''],
        bairro: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
        estado: ['', [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        cidade: ['', [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      })
    });
  }

  public changeTipoFornecedor(value: string): void {
    this.form.get('nome').setValue('');
    this.form.get('documento').setValue('');

    this.pessoaFisica = value;
    const documentoControl = this.form.get('documento');
    if (this.isPF) {
      documentoControl.setValidators([Validators.required, Validators.maxLength(11), Validators.minLength(11)]);
    } else {
      documentoControl.setValidators([Validators.required, Validators.maxLength(14), Validators.minLength(14)]);
    }
    this.form.updateValueAndValidity();
  }

  public changeCep(value: string): void {
    const enderecoControl = this.form.get('endereco');
    if (enderecoControl.get('cep').valid) {
      this.loadingService.show();
      this.viaCepService.get(StringUtil.onlyDigits(value))
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe(viaCep => {
          enderecoControl.get('complemento').setValue(viaCep.complemento);
          enderecoControl.get('logradouro').setValue(viaCep.logradouro);
          enderecoControl.get('estado').setValue(viaCep.uf);
          enderecoControl.get('bairro').setValue(viaCep.bairro);
          setTimeout(() => {
            enderecoControl.get('cidade').setValue(viaCep.ibge);
          }, 250);
        });
    }
  }

  private getActions(): void {
    this.actions = new Array<PoPageAction>();
    this.actions = [
      { label: 'Salvar', action: this.onSubmit.bind(this), disabled: !this.form.valid },
      { label: 'Cancelar', url: FORNECEDOR_CONFIG.pathFront },
    ];
  }

  private getEstados(): void {
    this.estados = new Array<PoSelectOption>();
    this.ibgeService
      .getEstados()
      .subscribe(
        estados => {
          estados.forEach(estado => {
            this.estados.push({
              label: estado.nome,
              value: estado.sigla
            });
          },
          (error: any) => this.exceptionService.handleError(error));
        });
  }

  public get isPF(): boolean {
    return this.pessoaFisica === '1';
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  public onSubmit(): void {
    if (this.form.invalid) {
      this.notificationService.error('Verifique o formulário.');
      return;
    }

    this.loadingService.show();

    this.fornecedor = this.form.value;
    this.fornecedor.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString(), 10);
    this.fornecedorService
      .save(this.fornecedor)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(
        fornecedorRes => {
          this.fornecedor = fornecedorRes;
          this.notificationService.success(`Fornecedor ${fornecedorRes.nome} cadastrado com sucesso.`);
          this.router.navigateByUrl(FORNECEDOR_CONFIG.pathFront);
        },
        (error) => this.exceptionService.handleError(error)
    );
  }
}
