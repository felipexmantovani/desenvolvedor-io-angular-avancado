import { Component, HostListener, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PoRadioGroupOption, PoSelectOption } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { IbgeService } from '../../../../core/modules/ibge/services/ibge.service';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { ViaCepService } from '../../../../core/modules/via-cep/services/via-cep.service';
import { ExceptionService } from '../../../../core/services/exception/exception.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { StringUtil } from '../../../../shared/utils/string.util';
import { Produto } from '../../../produto/models/produto.interface';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html'
})
export class FornecedorFormComponent implements OnInit, OnDestroy {
  public readonly options: Array<PoRadioGroupOption> = [
    { label: 'Pessoa física', value: '1' },
    { label: 'Pessoa jurídica', value: '2' }
  ];

  public form: FormGroup;

  public estados: Array<PoSelectOption> = new Array<PoSelectOption>();

  public cidades: Array<PoSelectOption> = new Array<PoSelectOption>();

  private subs: Subscription = new Subscription();

  private tipoFornecedor = '1';

  public get isPF(): boolean {
    return this.tipoFornecedor === '1';
  }

  @Input()
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
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      documento: [null, [Validators.required, Validators.maxLength(14), Validators.minLength(11)]],
      tipoFornecedor: [this.tipoFornecedor],
      ativo: [true],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required, Validators.maxLength(8), Validators.minLength(8)]],
        logradouro: [null, [Validators.required, Validators.maxLength(200), Validators.minLength(2)]],
        numero: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(1)]],
        complemento: [null],
        bairro: [null, [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
        estado: [null, [Validators.required, Validators.maxLength(50), Validators.minLength(2)]],
        cidade: [null, [Validators.required, Validators.maxLength(10), Validators.minLength(2)]],
      })
    });
    this.onChangesForm();

    if (this.isEdit()) {
      this.form.patchValue(this.fornecedor);

      this.form.get('tipoFornecedor').setValue(this.fornecedor.tipoFornecedor.toString());
      setTimeout(() => {
        this.form.get('endereco').get('estado').setValue(this.fornecedor.endereco.estado);
      }, 500);
    }
  }

  isEdit(): boolean {
    return this.fornecedor && this.fornecedor.id ? true : false;
  }

  private onChangesForm(): void {
    this.subs.add(
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
            if (this.isEdit()) {
              this.form.get('endereco').get('cidade').setValue(this.fornecedor.endereco.cidade);
            }
          });
      })
    );
  }

  public changeTipoFornecedor(value: string): void {
    this.form.get('nome').setValue('');
    this.form.get('documento').setValue('');

    this.tipoFornecedor = value;
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

    if (!this.isEdit()) {
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
    } else {
      const enderecoId: string = this.fornecedor.endereco.id;
      const fornecedorId: string = this.fornecedor.id;

      this.fornecedor = this.form.value;

      this.fornecedor.endereco.id = enderecoId;
      this.fornecedor.endereco.fornecedorId = fornecedorId;
      this.fornecedor.endereco.cidade = this.fornecedor.endereco.cidade.toString();

      this.fornecedor.id = fornecedorId;
      this.fornecedor.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString(), 10);
      this.fornecedor.produtos = new Array<Produto>();

      this.fornecedorService
        .updateEndereco(this.fornecedor.endereco)
        .subscribe(() => {
          this.fornecedorService
          .update(this.fornecedor)
          .pipe(finalize(() => this.loadingService.hide()))
          .subscribe(
            fornecedorRes => {
              this.fornecedor = fornecedorRes;
              this.notificationService.success(`Fornecedor ${fornecedorRes.nome} salvo com sucesso.`);
              this.router.navigateByUrl(FORNECEDOR_CONFIG.pathFront);
            },
            (error) => this.exceptionService.handleError(error)
          );
        });
    }
  }
}
