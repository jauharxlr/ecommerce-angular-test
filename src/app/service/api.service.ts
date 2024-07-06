import { Injectable } from '@angular/core';
import { RestService } from './rest.service';
import { Observable } from 'rxjs';
import { AuthResModel } from '../model/auth-res.model';
import { URL } from '../constant/url.constant';
import { RegistrationRequest } from '../model/register-req.model';
import { AddProductRequest } from '../model/add-product-req.model';
import { ProductRes } from '../model/product-res.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  constructor(private rest: RestService) { }

  deleteProduct(id: number): Observable<any> {
    return this.rest.makeAuthorizedDeleteRequest(URL.PRODUCT.DELETE + id);
  }

  public login(req: { emailId: string, password: string }): Observable<AuthResModel> {
    return this.rest.makePostRequest(URL.AUTH, req);
  }

  public register(req: RegistrationRequest): Observable<any> {
    return this.rest.makePostRequest(URL.REGISTER, req);
  }

  public addProduct(req: AddProductRequest): Observable<any> {
    return this.rest.makeAuthorizedPostRequest(URL.PRODUCT.ADD, req);
  }
  public editProduct(productId: number, req: AddProductRequest): Observable<any> {
    return this.rest.makeAuthorizedPutRequest(URL.PRODUCT.UPDATE + productId, req);
  }
  public getAllProducts(): Observable<ProductRes[]> {
    return this.rest.makeAuthorizedGetRequest(URL.PRODUCT.GET_ALL)
  }
  public search(key:string): Observable<ProductRes[]> {
    return this.rest.makeAuthorizedGetRequest(URL.PRODUCT.SEARCH+key)
  }
}
