
export class URL {

  public static BASE_URL: string = 'http://localhost:8080';

  public static PRODUCT = {
    ADD: `${this.BASE_URL}/product`,
    DELETE: `${this.BASE_URL}/product/`,
    UPDATE: `${this.BASE_URL}/product/`,
    SEARCH: `${this.BASE_URL}/product/search/`,
    GET_ALL: `${this.BASE_URL}/product`
  }

  public static AUTH : string = `${this.BASE_URL}/user/authenticate`
  public static REGISTER : string = `${this.BASE_URL}/user/register`

}
