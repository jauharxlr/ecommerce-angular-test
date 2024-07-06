import { Component } from '@angular/core';
import { RegistrationRequest } from '../../../model/register-req.model';
import { Router } from '@angular/router';
import { ApiService } from '../../../service/api.service';
import { UtilService } from '../../../service/util.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  request: RegistrationRequest = new RegistrationRequest();

  constructor(
    private router: Router,
    private util: UtilService,
    private api: ApiService) { }


  onSignup():void {
    if (!this.util.validateString(this.request.fullname)) {
      this.util.toastErr("Name should not be empty!");
    } else if (!this.util.validateString(this.request.contactNumber)) {
      this.util.toastErr("Contact Number should not be empty!");
    } else if (!this.util.validateEmail(this.request.emailId)) {
      this.util.toastErr("Provide a valid email!");
    } else if (!this.util.validateString(this.request.password)) {
      this.util.toastErr("Password should not be empty!");
    } else if (this.request.password.length < 8) {
      this.util.toastErr("Password should have minimum 8 charecters!");
    } else {
      this.api.register(this.request).subscribe(res => {
        this.util.toastInfo("Registration completed. Please login to continue...");
        this.router.navigateByUrl("/login");
      });
    }
  }

}
