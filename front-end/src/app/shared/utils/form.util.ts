import { FormControl, FormGroup } from '@angular/forms';

export class FormUtil {

  static validade(form: FormGroup): void {
    Object.keys(form.controls).forEach(field => {
      const control = form.get(field);
      if (control instanceof FormControl) {
        control.markAsDirty();
      } else if (control instanceof FormGroup) {
        this.validade(control);
      }
    });
  }

}
