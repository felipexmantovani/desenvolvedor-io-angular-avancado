import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormUtil } from './form.util';

describe('form-util.spec | FormUtil', () => {

  it('Deve validar formulário e marcar campos inválidos como dirty', () => {
    const form: FormGroup = new FormBuilder().group({
      primeiro: [null, [Validators.required]],
      fieldGroup: new FormBuilder().group({
        segundo: [null, [Validators.required]],
      })
    });

    expect(form.get('primeiro').dirty).toBeFalse();
    expect(form.get('fieldGroup').get('segundo').dirty).toBeFalse();

    FormUtil.validade(form);

    expect(form.get('primeiro').dirty).toBeTrue();
    expect(form.get('fieldGroup').get('segundo').dirty).toBeTrue();
  });

});
