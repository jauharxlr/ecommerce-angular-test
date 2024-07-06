import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { HOOK, Reflector } from '../../../service/reflector';
import { UserDetails } from '../../../model/auth-res.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(
    private profileReflect: Reflector<UserDetails>,
    private jwtReflect: Reflector<string>,
    private router:Router,
    private api:ApiService){}

  loginRequest = {
    emailId: '',
    password: ''
  }

  onLogin(){
    this.api.login(this.loginRequest).subscribe(res=>{
      this.jwtReflect.set(HOOK.JWT, "Bearer "+res.jwt);
      this.profileReflect.set(HOOK.USER_DETAILS, res.userDetails);
      this.router.navigateByUrl("/home")
    })
  }

}
