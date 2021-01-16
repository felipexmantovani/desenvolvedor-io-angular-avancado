import { Component, OnInit } from '@angular/core';
import { PoPieChartSeries } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FORNECEDOR_CONFIG } from '../../../fornecedor/fornecedor.config';
import { Fornecedor } from '../../../fornecedor/models/fornecedor.interface';
import { FornecedorService } from '../../../fornecedor/services/fornecedor.service';
import { Produto } from '../../../produto/models/produto.interface';
import { PRODUTO_CONFIG } from '../../../produto/produto.config';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html',
  providers: [FornecedorService],
})
export class PageHomeComponent implements OnInit, PageDefault {
  public pageTitle = 'Olá, seja bem-vindo!';

  private fornecedores: Array<Fornecedor>;

  private produtos: Array<Produto>;

  public series: Array<PoPieChartSeries>;

  constructor(
    private fornecedorService: FornecedorService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadingService.show();
    this.fornecedorService
      .read()
      .pipe(
        finalize(() => {
          this.loadingService.hide();
          this.createSeries();
        })
      )
      .subscribe((fornecedores) => {
        this.fornecedores = fornecedores;
      });
  }

  private createSeries(): void {
    this.series = [
      {
        category: FORNECEDOR_CONFIG.namePlural,
        value: this.fornecedores.length,
      },
      {
        category: PRODUTO_CONFIG.namePlural,
        value: 1,
      },
    ];
  }
}
