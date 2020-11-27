import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './loading.service';

@Component({
  selector: 'app-loading-component',
  template: `<po-loading-overlay
    *ngIf="showLoading"
    p-screen-lock="true"
    [p-text]="text">
  </po-loading-overlay>`
})
export class LoadingComponent implements OnInit, OnDestroy {
  public showLoading = false;

  @Input()
  public text = 'Aguarde...';

  private subs: Array<Subscription> = new Array<Subscription>();

  constructor(readonly loadingService: LoadingService) {}

  ngOnInit(): void {
    this.subs.push(
      this.loadingService.loadingBS.subscribe(value => {
        this.showLoading = value;
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.forEach(sub => sub.unsubscribe());
  }
}
