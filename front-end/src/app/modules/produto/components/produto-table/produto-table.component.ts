import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoDialogConfirmOptions, PoDialogService, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { Produto } from '../../models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-table',
  templateUrl: './produto-table.component.html',
  styleUrls: ['./produto-table.component.scss']
})
export class ProdutoTableComponent implements OnInit {
  columns: Array<PoTableColumn> = [
    {
      label: 'Status',
      property: 'ativo',
      width: '100px',
      type: 'columnTemplate',
    },
    {
      label: 'Imagem',
      property: 'imagem',
      width: '100px',
      type: 'columnTemplate',
    },
    { label: 'Nome', property: 'nome' },
    {
      label: 'Data cadastro',
      property: 'dataCadastro',
      type: 'date',
      width: '150px',
    },
    {
      label: 'Valor',
      property: 'valor',
      type: 'currency',
      width: '100px'
    },
    { label: 'Fornecedor', property: 'nomeFornecedor' }
  ];

  actionsTable: Array<PoTableAction> = [
    { label: 'Detalhes', icon: 'po-icon-eye', action: this.detalhes.bind(this) },
    { label: 'Excluir', icon: 'po-icon-delete', action: this.excluir.bind(this), type: 'danger' },
  ];

  @Input()
  produtos = new Array<Produto>();

  produtosAtivos = new Array<Produto>();

  produtosInativos = new Array<Produto>();

  pathImages = PRODUTO_CONFIG.pathImages;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
    private produtoService: ProdutoService,
    private notificationService: NotificationService,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    if (!this.produtos?.length) {
      this.produtos = this.activatedRoute.snapshot.data['produtos'];
    }
    this.produtosAtivos = this.produtos?.filter(produto => produto.ativo);
    this.produtosInativos = this.produtos?.filter(produto => !produto.ativo);
  }

  detalhes(produto: Produto): void {
    this.router.navigateByUrl(`${PRODUTO_CONFIG.pathFront}/detalhe/${produto.id}`);
  }

  excluir(produto: Produto): void {
    const options: PoDialogConfirmOptions = {
      title: 'Confirmação!',
      message: 'Realmente deseja excluir o produto?',
      confirm: () => {
        this.loadingService.show();
        this.produtoService
          .delete(produto.id)
          .pipe(finalize(() => this.loadingService.hide()))
          .subscribe(produtoRes => {
            this.notificationService.success(`Produto ${produtoRes.nome} excluído com sucesso.`);
            this.produtoService
              .read()
              .subscribe(produtos => this.produtos = produtos);
          });
      },
      cancel: () => {}
    };
    this.poDialogService.confirm(options);
  }
}
