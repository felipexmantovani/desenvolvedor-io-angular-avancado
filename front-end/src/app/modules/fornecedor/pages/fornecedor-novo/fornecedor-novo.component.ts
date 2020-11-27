import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoBreadcrumb, PoSelectOption } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';

@Component({
  selector: 'app-fornecedor-novo',
  templateUrl: './fornecedor-novo.component.html'
})
export class FornecedorNovoComponent implements OnInit, PageDefault {
  public pageTitle = `Novo ${FORNECEDOR_CONFIG.name}`;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public form: FormGroup;

  public estados: Array<PoSelectOption> = [
   {
     label: 'a',
     value: 'b'
   }
  ];

  public cidades: Array<PoSelectOption> = [
    {
      label: 'a',
      value: 'b'
    }
   ];

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.createForm();
  }

  private createForm(): void {
    this.form = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.maxLength(100), Validators.minLength(2)]],
      documento: ['', [Validators.required, Validators.maxLength(14), Validators.minLength(11)]],
      tipoFornecedor: ['0', [Validators.required]],
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

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  public changeEstado(): void {}

  public onSubmit(): void {}
}
