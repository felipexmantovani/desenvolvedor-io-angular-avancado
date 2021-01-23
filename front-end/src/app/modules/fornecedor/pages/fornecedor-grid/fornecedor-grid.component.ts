import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { Subscription } from 'rxjs';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { AuthService } from '../../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedor-grid',
  templateUrl: './fornecedor-grid.component.html'
})
export class FornecedorGridComponent implements OnInit, OnDestroy, PageDefault {
  public pageTitle = FORNECEDOR_CONFIG.namePlural;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public actionsPage: Array<PoPageAction>;

  public readonly actionsTable: Array<PoTableAction> = [
    { label: 'Detalhes', icon: 'po-icon-eye', action: this.detalhes.bind(this) },
    { label: 'Excluir', icon: 'po-icon-delete', action: this.excluir.bind(this), type: 'danger' },
  ];

  public readonly columns: Array<PoTableColumn> = [
    {
      property: 'ativo',
      width: '100px',
      label: 'Status',
      type: 'cellTemplate'
    },
    { label: 'Nome', property: 'nome' },
    { label: 'Documento', property: 'documento' },
  ];

  public fornecedores: Array<Fornecedor>;

  public isLogged = false;

  private subs: Subscription = new Subscription();

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.fornecedores = this.activatedRoute.snapshot.data['fornecedores'];

    this.subs.add(
      this.authService.isLoggedBS.subscribe(value => {
        this.isLogged = this.authService.isLogged() || value;
        this.getActionsPage();
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  private getActionsPage(): void {
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

  private detalhes(fornecedor: Fornecedor): void {
    console.log(fornecedor);
  }

  private excluir(fornecedor: Fornecedor): void {
    console.log(fornecedor);
  }
}
