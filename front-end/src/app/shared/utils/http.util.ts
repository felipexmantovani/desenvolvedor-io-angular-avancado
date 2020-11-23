export class HttpUtil {
  public static extractData(result: any): any {
    return result.data || {};
  }
}
