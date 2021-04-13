export class HttpUtil {
  static extractData(result: any): any {
    return result.data || {};
  }
}
