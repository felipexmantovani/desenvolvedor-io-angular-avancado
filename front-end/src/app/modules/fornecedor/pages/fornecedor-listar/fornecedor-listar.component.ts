import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedor-listar',
  templateUrl: './fornecedor-listar.component.html'
})
export class FornecedorListarComponent implements OnInit, OnDestroy, PageDefault {
  public pageTitle = FORNECEDOR_CONFIG.namePlural;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public actionsPage: Array<PoPageAction> = new Array<PoPageAction>();

  public actionsTable: Array<PoTableAction> = new Array<PoTableAction>();

  public columns: Array<PoTableColumn>;

  public fornecedores: Array<Fornecedor>;

  public isLogged = false;

  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fornecedores = this.activatedRoute.snapshot.data['fornecedores'];

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
      { label: 'Documento', property: 'documento' }
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
    console.log(fornecedor);
  }
}
