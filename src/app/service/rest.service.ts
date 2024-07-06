import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HOOK, Reflector } from './reflector';
import { UtilService } from './util.service';

@Injectable({
  providedIn: 'root',
})
export class RestService {
  private headers = new HttpHeaders();
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private jwtReflect: Reflector<string>,
    private utilService:UtilService
  ) { }

  public makeGetRequest(url: string): Observable<any> {
    this.spinner.show();
    return this.http.get(url).pipe(
      tap((_) => { this.spinner.hide(); }),
      catchError((err) => {
        console.log(err)
        this.spinner.hide();
        if(err.status==403 || err.status==401){
          this.utilService.logout();
          this.utilService.toastErr("Session Expired")
        }
        return throwError(err);
      })
    );
  }

  public makePostRequest(url: string, payload: any): Observable<any> {
    this.spinner.show();
    let headers = new HttpHeaders();
    return this.http.post(url, payload, {headers:headers}).pipe(
      tap((_) => { 
        this.spinner.hide();
      }),
      catchError((err) => {
        this.spinner.hide();
        // this.snackBar.open('Error while loading. Try refreshing!', '', {
        //   duration: 1000,
        // });
        return throwError(err);
      })
    );
  }

  public makePutRequest(url: string, payload: any): Observable<any> {
    return this.http.put(url, payload, { observe: 'response' }).pipe(
      tap((_) => { }),
      catchError((err) => {
        this.spinner.hide();
        this.snackBar.open('Error while loading. Try refreshing!', '', {
          duration: 1000,
        });
        return throwError(err);
      })
    );
  }

  public makeAuthorizedDeleteRequest(url: string): Observable<any> {
    return this.http.delete(url,{ headers: this.headers.set('Authorization', this.jwtReflect.get(HOOK.JWT)) }).pipe(tap(_ => console.log("request completed")),
    catchError(err => {
      console.log(err)
          this.spinner.hide();
          if(err.status==403||err.status==401){
            this.utilService.logout();
            this.utilService.toastErr("Session Expired")
          }
          return throwError(err);
    }));
    
  }
  public makeAuthorizedPutRequest(url: string, payload: any): Observable<any> {
    return this.http
      .put(url, payload,{ headers: this.headers.set('Authorization', this.jwtReflect.get(HOOK.JWT)) }).pipe(tap(_ => console.log("request completed")),
        catchError(err => {
          console.log(err)
          this.spinner.hide();
          if(err.status==403 || err.status==401){
            this.utilService.logout();
            this.utilService.toastErr("Session Expired")
          }
          return throwError(err);
        }));
  }


  public makeAuthorizedPostRequest(url: string, payload: any): Observable<any> {
    // this.spinner.show();
    return this.http
      .post(url, payload, { headers: this.headers.set('Authorization', this.jwtReflect.get(HOOK.JWT)) }).pipe(
        tap((_) => { this.spinner.hide(); }), 
        tap(_ => console.log("request completed")),
        catchError(err => {
          if(err.status==403 || err.status==401){
            this.utilService.logout();
            this.utilService.toastErr("Session Expired")
          }
          this.spinner.hide();
          return throwError(err);
        }));
  } 
  public makeAuthorizedGetRequest(url: any): Observable<any> {
    this.headers = this.headers
    this.spinner.show();
    return this.http
      .get(url, { headers: this.headers.set('Authorization', this.jwtReflect.get(HOOK.JWT)) }).pipe(
        tap((_) => { this.spinner.hide(); }), 
        tap(_ => console.log("request completed")),
        catchError(err => {
          console.log(err)
          this.spinner.hide();
          if(err.status==403 || err.status==401){
            this.utilService.logout();
            this.utilService.toastErr("Session Expired")
          }
          return throwError(err);
        }));
  }
}
