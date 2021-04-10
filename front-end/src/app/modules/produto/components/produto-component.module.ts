import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule } from '@po-ui/ng-components';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FornecedorDirectiveModule } from '../../fornecedor/directives/fornecedor-directive.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';

@NgModule({
  declarations: [ProdutoFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    FornecedorDirectiveModule,
    ImageCropperModule,
    PoButtonModule
  ],
  exports: [ProdutoFormComponent]
})
export class ProdutoComponentModule {}
