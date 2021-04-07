import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PoBreadcrumb } from '@po-ui/ng-components';
import { PageDefault } from '../../../shared/interfaces/page-default.interface';
import { AuthService } from '../../auth/services/auth.service';
import { FORNECEDOR_CONFIG } from '../../fornecedor/fornecedor.config';
import { Fornecedor } from '../../fornecedor/models/fornecedor.interface';
import { Produto } from '../../produto/models/produto.interface';
import { PRODUTO_CONFIG } from '../../produto/produto.config';

@Component({
  selector: 'app-page-home',
  templateUrl: './page-home.component.html'
})
export class PageHomeComponent implements OnInit, PageDefault {
  pageTitle = 'Olá, seja bem-vindo(a)!';

  breadcrumb: PoBreadcrumb = {
    items: [
      { label: 'Home', link: '/' }
    ]
  };

  get fornecedoresTitle(): string {
    return FORNECEDOR_CONFIG.namePlural;
  }

  fornecedores = new Array<Fornecedor>();

  fornecedoresAtivos = new Array<Fornecedor>();

  fornecedoresInativos = new Array<Fornecedor>();

  get produtosTitle(): string {
    return PRODUTO_CONFIG.namePlural;
  }

  produtos = new Array<Produto>();

  produtosAtivos = new Array<Produto>();

  produtosInativos = new Array<Produto>();

  constructor(
    public authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fornecedores = this.activatedRoute.snapshot.data['fornecedores'];
    this.fornecedoresAtivos = this.fornecedores.filter(fornecedor => fornecedor.ativo);
    this.fornecedoresInativos = this.fornecedores.filter(fornecedor => !fornecedor.ativo);

    if (this.authService.isLogged()) {
      this.produtos = this.activatedRoute.snapshot.data['produtos'] || new Array<Produto>();
      if (this.produtos.length) {
        this.produtosAtivos = this.produtos.filter(produto => produto.ativo);
        this.produtosInativos = this.produtos.filter(produto => !produto.ativo);
      }
    }
  }
}
