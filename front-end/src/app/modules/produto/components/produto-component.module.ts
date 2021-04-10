import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { PoButtonModule, PoDividerModule, PoFieldModule, PoTableModule, PoTagModule } from '@po-ui/ng-components';
import { ImageCropperModule } from 'ngx-image-cropper';
import { FornecedorDirectiveModule } from '../../fornecedor/directives/fornecedor-directive.module';
import { ProdutoFormComponent } from './produto-form/produto-form.component';
import { ProdutoTableComponent } from './produto-table/produto-table.component';

@NgModule({
  declarations: [ProdutoFormComponent, ProdutoTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    PoFieldModule,
    PoDividerModule,
    FornecedorDirectiveModule,
    ImageCropperModule,
    PoButtonModule,
    PoDividerModule,
    PoTableModule,
    PoTagModule
  ],
  exports: [ProdutoFormComponent, ProdutoTableComponent]
})
export class ProdutoComponentModule {}
