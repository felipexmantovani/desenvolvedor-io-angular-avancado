import { Component } from '@angular/core';
import { PageDefault } from '../../../shared/interfaces/page-default.interface';

@Component({
  selector: 'app-page-erro',
  templateUrl: './page-erro.component.html',
  styleUrls: ['./page-erro.component.scss']
})
export class PageErroComponent implements PageDefault {

  pageTitle = 'Página não encontrada';

  constructor() {}

  voltar(): void {
    window.history.back();
  }

}
