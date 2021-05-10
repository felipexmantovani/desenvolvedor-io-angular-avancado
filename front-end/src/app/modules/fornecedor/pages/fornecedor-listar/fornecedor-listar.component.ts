import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoDialogConfirmOptions, PoDialogService, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PoPageDynamicSearchLiterals } from '@po-ui/ng-templates';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { LoadingService } from '../../../../core/modules/loading/loading.service';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { NotificationService } from '../../../../shared/services/notification/notification.service';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';
import { FornecedorService } from '../../services/fornecedor.service';

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html',
  styleUrls: ['./fornecedor-listar.component.scss']
})
export class FornecedorListarComponent implements OnInit, OnDestroy, PageDefault {
  pageTitle = FORNECEDOR_CONFIG.namePlural;

  breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  actionsPage: Array<PoPageAction> = new Array<PoPageAction>();

  actionsTable: Array<PoTableAction> = new Array<PoTableAction>();

  columns: Array<PoTableColumn>;

  fornecedores = new Array<Fornecedor>();

  fornecedoresImmutable = new Array<Fornecedor>();

  fornecedoresAtivos = new Array<Fornecedor>();

  fornecedoresInativos = new Array<Fornecedor>();

  isLogged = false;

  optionsDialogConfirm: PoDialogConfirmOptions;

  literals: PoPageDynamicSearchLiterals = {
    searchPlaceholder: 'Pesquise pelo nome'
  };

  subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private fornecedorService: FornecedorService,
    private loadingService: LoadingService,
    private notificationService: NotificationService,
    private poDialogService: PoDialogService
  ) {}

  ngOnInit(): void {
    this.fornecedoresImmutable = this.activatedRoute.snapshot.data['fornecedores'];
    this.fornecedores = this.fornecedoresImmutable;
    this.setAtivosInativos();

    this.subs.add(
      this.authService.isLoggedBS.subscribe(value => {
        this.isLogged = this.authService.isLogged() || value;
      })
    );

    this.getCollums();
    this.getActionsPage();
    this.getActionsTable();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  getCollums(): void {
    this.columns = [
      {
        label: 'Status',
        property: 'ativo',
        width: '100px',
        type: 'columnTemplate',
      },
      { label: 'Nome', property: 'nome' },
      {
        label: 'Documento',
        property: 'documento',
        type: 'columnTemplate'
      }
    ];
  }

  getActionsPage(): void {
    if (this.isLogged) {
      this.actionsPage = [
        {
          label: `Novo ${FORNECEDOR_CONFIG.name}`,
          icon: 'po-icon-plus',
          url: `${FORNECEDOR_CONFIG.pathFront}/novo`
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

  detalhes(fornecedor: Fornecedor): void {
    this.router.navigateByUrl(`${FORNECEDOR_CONFIG.pathFront}/detalhe/${fornecedor.id}`);
  }

  excluir(fornecedor: Fornecedor): void {
    this.optionsDialogConfirm = {
      title: 'Confirmação!',
      message: 'Realmente deseja excluir o fornecedor?',
      confirm: () => {
        this.loadingService.show();
        this.fornecedorService
          .delete(fornecedor.id)
          .pipe(finalize(() => this.loadingService.hide()))
          .subscribe(fornecedorRes => {
            this.notificationService.success(`Fornecedor ${fornecedorRes.nome} excluído com sucesso.`);
            this.fornecedorService
              .read()
              .subscribe(fornecedores => this.fornecedores = fornecedores);
          });
      }
    };
    this.poDialogService.confirm(this.optionsDialogConfirm);
  }

  setAtivosInativos(): void {
    this.fornecedoresAtivos = this.fornecedores.filter(fornecedor => fornecedor.ativo);
    this.fornecedoresInativos = this.fornecedores.filter(fornecedor => !fornecedor.ativo);
  }

  onQuickSearch(filtro: string): void {
    filtro === '' ?
    this.onChangeDisclaimers() :
    this.fornecedores = this.fornecedoresImmutable.filter(
      (fornecedor) => fornecedor.nome.toLowerCase().includes(filtro.toLowerCase())
    );
    this.setAtivosInativos();
  }

  onChangeDisclaimers(): void {
    this.fornecedores = this.fornecedoresImmutable;
    this.setAtivosInativos();
  }
}
