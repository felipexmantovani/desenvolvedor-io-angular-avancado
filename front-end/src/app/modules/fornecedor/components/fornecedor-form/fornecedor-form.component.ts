import { Component, HostListener, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { PoModalComponent, PoRadioGroupOption, PoSelectOption } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { IbgeService } from '../../../../shared/modules/ibge/services/ibge.service';
import { ViaCepService } from '../../../../shared/modules/via-cep/services/via-cep.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { FormUtil } from '../../../../shared/utils/form.util';
import { StringUtil } from '../../../../shared/utils/string.util';
import { Produto } from '../../../produto/models/produto.interface';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-form',
  templateUrl: './fornecedor-form.component.html',
  styleUrls: ['./fornecedor-form.component.scss']
})
export class FornecedorFormComponent implements OnInit, OnDestroy {
  options: Array<PoRadioGroupOption> = [
    { label: 'Pessoa física', value: '1' },
    { label: 'Pessoa jurídica', value: '2' }
  ];

  form: FormGroup;

  estados: Array<PoSelectOption> = new Array<PoSelectOption>();

  cidades: Array<PoSelectOption> = new Array<PoSelectOption>();

  subs: Subscription = new Subscription();

  tipoFornecedor = '1';

  get isPF(): boolean {
    return this.tipoFornecedor === '1';
  }

  enderecoCompleto = '';

  linkGoogleMaps: any;

  @ViewChild('modalMapa', { static: true })
  modalMapa: PoModalComponent;

  @Input()
  fornecedor: Fornecedor;

  constructor(
    private formBuilder: FormBuilder,
    private viaCepService: ViaCepService,
    private ibgeService: IbgeService,
    private loadingService: LoadingService,
    private fornecedorService: FornecedorService,
    private notificationService: NotificationService,
    private router: Router,
    public domSanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getEstados();
    if (this.isEdit()) {
      this.getMunicipio(this.fornecedor.endereco.cidade);
    }
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      nome: [null, [Validators.required]],
      documento: [null, [Validators.required, StringUtil.isValidCpf()]],
      tipoFornecedor: [this.tipoFornecedor],
      ativo: [true],
      endereco: this.formBuilder.group({
        cep: [null, [Validators.required]],
        logradouro: [null, [Validators.required]],
        numero: [null, [Validators.required]],
        complemento: [null],
        bairro: [null, [Validators.required]],
        estado: [null, [Validators.required]],
        cidade: [null, [Validators.required]],
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

  onChangesForm(): void {
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

  changeTipoFornecedor(value: string): void {
    this.form.get('nome').setValue('');
    this.form.get('documento').setValue('');

    this.tipoFornecedor = value;

    const documentoControl = this.form.get('documento');
    documentoControl.clearAsyncValidators();
    if (this.isPF) {
      documentoControl.setValidators([Validators.required, StringUtil.isValidCpf()]);
    } else {
      documentoControl.setValidators([Validators.required, StringUtil.isValidCnpj()]);
    }
    documentoControl.updateValueAndValidity();
    documentoControl.setErrors(null);
  }

  changeCep(value: string): void {
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

  getEstados(): void {
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
          });
        });
  }

  getMunicipio(municipioId: string): void {
    this.ibgeService
      .getMunicipio(municipioId)
      .subscribe(municipio => {
        this.enderecoCompleto = `${this.fornecedor.endereco.logradouro}, ${this.fornecedor.endereco.numero}, ${this.fornecedor.endereco.bairro}, ${municipio.nome}-${this.fornecedor.endereco.estado}`;
        this.linkGoogleMaps = `https://maps.google.com/maps?q=${this.enderecoCompleto}&t=&z=15&ie=UTF8&iwloc=&output=embed`;
      });
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      FormUtil.validade(this.form);
      this.notificationService.error('Verifique o formulário.');
      return;
    }

    this.loadingService.show();

    if (!this.isEdit()) {
      this.fornecedor = this.form.value;
      this.fornecedor.tipoFornecedor = parseInt(this.fornecedor.tipoFornecedor.toString(), 10);
      this.fornecedor.endereco.cidade = this.fornecedor.endereco.cidade.toString();

      this.fornecedorService
        .create(this.fornecedor)
        .pipe(finalize(() => this.loadingService.hide()))
        .subscribe(
          fornecedorRes => {
            this.fornecedor = fornecedorRes;
            this.notificationService.success(`Fornecedor ${this.fornecedor.nome} cadastrado com sucesso.`);
            this.router.navigateByUrl(FORNECEDOR_CONFIG.pathFront);
          }
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
            }
          );
        });
    }
  }

  verMapa(): void {
    this.modalMapa.open();
  }
}
