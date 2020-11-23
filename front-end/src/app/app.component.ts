import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LoadingService } from './core/services/loading/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {

  public showLoading = false;

  private subs: Array<Subscription> = new Array<Subscription>();

  constructor(
    private loadingService: LoadingService
  ) {}

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
