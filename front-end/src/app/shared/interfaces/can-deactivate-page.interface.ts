import { Observable } from 'rxjs';

export interface CanDeactivatePage {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;

  canDeactivateTextModal: string;

  onSubmitForm?: boolean;
}
