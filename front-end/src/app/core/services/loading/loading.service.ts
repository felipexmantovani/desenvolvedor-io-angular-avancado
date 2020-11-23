import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public readonly loadingBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() {}

  public show(): void {
    this.loadingBS.next(true);
  }

  public hide(): void {
    this.loadingBS.next(false);
  }
}
