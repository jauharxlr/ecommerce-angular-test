import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HOOK, Reflector } from './reflector';
import { AuthResModel, UserDetails } from '../model/auth-res.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor(
    private userProfileRef: Reflector<UserDetails>,
    private authTokenRef: Reflector<string>,
    private snack: MatSnackBar,
    private router: Router) { }

  public static isTextEmpty(str: string): boolean {
    return str === undefined || str === null || str.trim() === '';
  }

  validateCollection(col: any[]) {
    return col != undefined && col != null && col.length > 0;
  }
  validateString(str: string): boolean {
    return str != undefined && null != str && str != '';
  }

  validatePositiveNumber(str: number): boolean {
    return str != undefined && null != str && str > 0;
  }

  validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  }

  toastInfo(txt: string, duration: number = 2000) {
    this.snack.open(txt, '', { duration: duration });
  }

  toastErr(txt: string, duration: number = 2000) {
    this.snack.open(txt, '', { duration: duration });
  }

  navigate(uri: string) {
    this.router.navigateByUrl(uri);
  }

  logout(doRedirect: boolean = true) {
    this.userProfileRef.clear(HOOK.USER_DETAILS);
    this.authTokenRef.clear(HOOK.JWT);
    if (doRedirect == true) {
      this.navigate('/login');
    }
  }

}
