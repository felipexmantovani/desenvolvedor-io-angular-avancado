import { Observable } from 'rxjs';

export interface CanDeactivateForm {
  canDeactivate: () => boolean | Promise<boolean> | Observable<boolean>;

  canDeactivateTextModal: string;

  formClickSave?: boolean;
}
