import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { APP_CONFIG } from './app.config';
import { StorageService } from './core/services/storage/storage.service';
import { AUTH_CONFIG } from './modules/auth/auth.config';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  subs = new Subscription();

  constructor(
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.subs.add(
      this.router.events.subscribe((event: any) => {
        if (event instanceof NavigationStart) {
          if (event.url !== `${AUTH_CONFIG.pathFront}/login`) {
            this.storageService.localSetItem(APP_CONFIG.keyLastRoute, event.url);
          }
        }
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
