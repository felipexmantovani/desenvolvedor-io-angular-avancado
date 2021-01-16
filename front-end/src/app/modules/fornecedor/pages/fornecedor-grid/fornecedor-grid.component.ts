import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb, PoPageAction, PoTableAction, PoTableColumn } from '@po-ui/ng-components';
import { PageDefault } from '../../../../shared/interfaces/page-default.interface';
import { FORNECEDOR_CONFIG } from '../../fornecedor.config';
import { Fornecedor } from '../../models/fornecedor.interface';

@Component({
  selector: 'app-fornecedor-grid',
  templateUrl: './fornecedor-grid.component.html'
})
export class FornecedorGridComponent implements OnInit, PageDefault {
  public pageTitle = FORNECEDOR_CONFIG.namePlural;

  public readonly breadcrumb: PoBreadcrumb = {
    items: [{ label: 'Home', link: '/' }, { label: this.pageTitle }]
  };

  public readonly actionsPage: Array<PoPageAction> = [
    {
      label: `Novo ${FORNECEDOR_CONFIG.name}`,
      icon: 'po-icon-plus',
      url: `${FORNECEDOR_CONFIG.pathFront}/novo`
    }
  ];

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

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.fornecedores = this.activatedRoute.snapshot.data['fornecedores'];
  }

  private detalhes(fornecedor: Fornecedor): void {
    console.log(fornecedor);
  }

  private excluir(fornecedor: Fornecedor): void {
    console.log(fornecedor);
  }
}
