import { Component, OnInit } from '@angular/core';
import { PoPieChartSeries } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { Fornecedor } from '../../../fornecedor/models/fornecedor.interface';
import { FornecedorService } from '../../../fornecedor/services/fornecedor.service';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  providers: [FornecedorService],
})
export class PageHomeComponent implements OnInit, PageDefault {
  pageTitle = 'Olá, seja bem-vindo(a)!';

  fornecedores: Array<Fornecedor>;

  fornecedoresAtivos: Array<Fornecedor>;

  fornecedoresInativos: Array<Fornecedor>;

  series: Array<PoPieChartSeries>;

  get fornecedoresTitle(): string {
    return FORNECEDOR_CONFIG.namePlural;
  }

  constructor(
    private fornecedorService: FornecedorService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.getFornecedores();
  }

  getFornecedores(): void {
    this.loadingService.show();
    this.fornecedorService
      .read()
      .pipe(
        finalize(() => {
          this.loadingService.hide();
        })
      )
      .subscribe((fornecedores) => {
        this.fornecedores = fornecedores;
        this.fornecedoresAtivos = this.fornecedores.filter(fornecedor => fornecedor.ativo);
        this.fornecedoresInativos = this.fornecedores.filter(fornecedor => !fornecedor.ativo);
      });
  }
}
