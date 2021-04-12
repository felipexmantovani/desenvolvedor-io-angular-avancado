import { Observable } from 'rxjs';

export interface CanDeactivateGuard {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;

  canDeactivateTextModal: string;
}
