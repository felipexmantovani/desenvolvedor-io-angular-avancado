import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { APP_CONFIG } from '../../../../app.config';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html'
})
export class ProdutoFormComponent implements OnInit {
  form: FormGroup;

  urlUpload = APP_CONFIG.apiV1;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fornecedor: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      ativo: [true],
      imagem: [null, [Validators.required]]
    });
  }

  onSubmit(): void {
    console.log(this.form.value);
  }
}
