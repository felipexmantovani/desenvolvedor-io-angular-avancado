import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { Produto } from '../../models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-form',
  templateUrl: './produto-form.component.html'
})
export class ProdutoFormComponent implements OnInit {
  form: FormGroup;

  imageChangedEvent: any = '';

  croppedImage: any = '';

  @ViewChild('inputFile', {static: true})
  inputFile: ElementRef;

  produto: Produto;

  constructor(
    private formBuilder: FormBuilder,
    private notificationService: NotificationService,
    private loadingService: LoadingService,
    private produtoService: ProdutoService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.form = this.formBuilder.group({
      fornecedorId: [null, [Validators.required]],
      nome: [null, [Validators.required]],
      descricao: [null, [Validators.required]],
      valor: [null, [Validators.required]],
      ativo: [true],
      imagem: [null]
    });
  }

  selectImage(): void {
    this.inputFile.nativeElement.click();
  }

  fileChangeEvent(event: Event): void {
    this.imageChangedEvent = event;
    console.log(this.imageChangedEvent);
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  @HostListener('window:keyup', ['$event'])
  keyUp(event: KeyboardEvent): void {
    if (event.key === 'Enter' && this.form.valid) {
      this.onSubmit();
    }
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.notificationService.error('Verifique o formulário.');
      return;
    }

    this.loadingService.show();

    this.produto = this.form.value;

    this.produto.imagemUpload = this.croppedImage.split(',')[1];

    console.log(this.produto);

    this.produtoService
      .save(this.produto)
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(produto => {
        this.produto = produto;
        this.notificationService.success(`Produto ${this.produto.nome} cadastrado com sucesso.`);
        this.router.navigateByUrl(PRODUTO_CONFIG.pathFront);
      });
  }
}
