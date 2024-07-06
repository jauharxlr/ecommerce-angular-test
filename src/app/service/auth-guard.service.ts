import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { HOOK, Reflector } from './reflector';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {

  constructor(private router: Router, private authTokenRef: Reflector<string>) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    let token = this.authTokenRef.get(HOOK.JWT);
    if (token != '' && token != undefined && token != null) {
      return true;
    } else {
      this.router.navigateByUrl('/login')
      return false;
    }
  }
}
