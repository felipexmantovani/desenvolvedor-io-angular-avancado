import { Pipe, PipeTransform } from '@angular/core';
import { StringUtil } from '../../../utils/string.util';

@Pipe({
  name: 'cpfCnpj'
})
export class CpfCnpjPipe implements PipeTransform {
  constructor() {}

  transform(value: string, ...args: unknown[]): string {
    if (value.length <= 11) {
      return StringUtil.maskCpf(value);
    } else {
      return StringUtil.maskCnpj(value);
    }
  }
}
