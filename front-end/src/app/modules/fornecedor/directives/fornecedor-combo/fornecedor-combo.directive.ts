import { Directive, Host, Inject, OnInit, Optional, SimpleChange } from '@angular/core';
import { NgControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { PoComboComponent } from '@po-ui/ng-components';
import { FornecedorService } from '../../services/fornecedor.service';

@Directive({
  selector: '[appFornecedorCombo]'
})
export class FornecedorComboDirective implements OnInit {
  combo: PoComboComponent;

  constructor(
    @Host() @Inject(NG_VALUE_ACCESSOR)
    private host: Array<PoComboComponent>,
    @Host() @Optional()
    private ngControl: NgControl,
    private fornecedorService: FornecedorService
  ) { }

  ngOnInit(): void {
    this.combo = this.host[0];
    if (this.combo) {
      this.combo.filterService = this.fornecedorService;
      this.combo.placeholder = 'Selecione o fornecedor';
      this.combo.debounceTime = 500;
      this.combo.filterMinlength = 1;
      this.combo.ngOnChanges({filterService: new SimpleChange(undefined, this.fornecedorService, true)});
      if (this.ngControl && this.ngControl.control) {
        this.combo.writeValue(this.ngControl.control.value);
      }
    }
  }
}
