import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDialogConfirmOptions, PoDialogService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { NotificationService } from '../../../../core/services/notification/notification.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { Produto } from '../../models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto.config';
import { ProdutoService } from '../../services/produto.service';

@Component({
  selector: 'app-produto-listar',
  templateUrl: './produto-listar.component.html',
  styleUrls: ['./produto-listar.component.scss']
})
export class ProdutoListarComponent implements OnInit, PageDefault {
  pageTitle = PRODUTO_CONFIG.namePlural;

  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  actionsPage: Array<PoPageAction> = new Array<PoPageAction>();

  actionsTable: Array<PoTableAction> = new Array<PoTableAction>();

  columns: Array<PoTableColumn>;

  produtos = new Array<Produto>();

  produtosAtivos = new Array<Produto>();

  produtosInativos = new Array<Produto>();

  isLogged = false;

  subs: Subscription = new Subscription();

  pathImages = PRODUTO_CONFIG.pathImages;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private loadingService: LoadingService,
    private produtoService: ProdutoService,
    private notificationService: NotificationService,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    this.produtos = this.activatedRoute.snapshot.data['produtos'];
    this.produtosAtivos = this.produtos.filter(produto => produto.ativo);
    this.produtosInativos = this.produtos.filter(produto => !produto.ativo);

    this.subs.add(
      this.authService.isLoggedBS.subscribe(value => {
        this.isLogged = this.authService.isLogged() || value;
      })
    );

    this.getCollums();
    this.getActionsPage();
    this.getActionsTable();
  }

  getCollums(): void {
    this.columns = [
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
  }

  getActionsPage(): void {
    if (this.isLogged) {
      this.actionsPage = [
        {
          label: `Novo ${PRODUTO_CONFIG.name}`,
          icon: 'po-icon-plus',
          url: `${PRODUTO_CONFIG.pathFront}/novo`
        }
      ];
    }
  }

  getActionsTable(): void {
    if (this.isLogged) {
      this.actionsTable = [
        { label: 'Detalhes', icon: 'po-icon-eye', action: this.detalhes.bind(this) },
        { label: 'Excluir', icon: 'po-icon-delete', action: this.excluir.bind(this), type: 'danger' },
      ];
    }
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
