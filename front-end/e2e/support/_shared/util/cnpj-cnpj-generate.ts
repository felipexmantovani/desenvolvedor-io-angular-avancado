export class CpfCnpjGenerate {

  private static gera_random(n: number) {
    const random = Math.round(Math.random() * n);
    return random;
  }

  private static mod(dividendo: number, divisor: number) {
    return Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));
  }

  static cpfValido(): string {
    const n = 9;
    const n1 = this.gera_random(n);
    const n2 = this.gera_random(n);
    const n3 = this.gera_random(n);
    const n4 = this.gera_random(n);
    const n5 = this.gera_random(n);
    const n6 = this.gera_random(n);
    const n7 = this.gera_random(n);
    const n8 = this.gera_random(n);
    const n9 = this.gera_random(n);

    let d1 = n9*2+n8*3+n7*4+n6*5+n5*6+n4*7+n3*8+n2*9+n1*10;
    d1 = 11 - (this.mod(d1, 11));
    if (d1 >= 10) {
      d1 = 0
    }

    let d2 = d1*2+n9*3+n8*4+n7*5+n6*6+n5*7+n4*8+n3*9+n2*10+n1*11;
    d2 = 11 - (this.mod(d2, 11));
    if (d2 >= 10) {
      d2 = 0;
    }

    return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+d1+d2;
  }

  static cnpjValido(): string {
    const n = 9;
    const n1 = this.gera_random(n);
    const n2 = this.gera_random(n);
    const n3 = this.gera_random(n);
    const n4 = this.gera_random(n);
    const n5 = this.gera_random(n);
    const n6 = this.gera_random(n);
    const n7 = this.gera_random(n);
    const n8 = this.gera_random(n);
    const n9 = 0;
    const n10 = 0;
    const n11 = 0;
    const n12 = 1;

    let d1 = n12*2+n11*3+n10*4+n9*5+n8*6+n7*7+n6*8+n5*9+n4*2+n3*3+n2*4+n1*5;
    d1 = 11 - ( this.mod(d1, 11) );
    if (d1 >= 10) {
      d1 = 0
    }

    let d2 = d1*2+n12*3+n11*4+n10*5+n9*6+n8*7+n7*8+n6*9+n5*2+n4*3+n3*4+n2*5+n1*6;
    d2 = 11 - ( this.mod(d2, 11) );
    if (d2 >= 10) {
      d2 = 0
    };

    return ''+n1+n2+n3+n4+n5+n6+n7+n8+n9+n10+n11+n12+d1+d2;
  }

  static selecionaEstadoRandom(select: HTMLElement): void {
    const selectElement = (select as HTMLSelectElement);
    selectElement.options[Math.floor(Math.random()*(selectElement.length - 0) + 0)].click();
  }

}
