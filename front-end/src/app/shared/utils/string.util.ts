export class StringUtil {
  static resume(value: string, quantityCharacters: number, threePoints?: boolean): string {
    let valueResume = (value.substr(0, quantityCharacters));
    if (threePoints) {
      valueResume = `${valueResume}...`;
    }
    return valueResume.trim();
  }
}
