import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  isLoginView = true;

  constructor(private auth: AuthService) {
  }



  onSwitchMode(){
    this.isLoginView = !this.isLoginView;
  }

  onSubmit(authForm: NgForm) {

    if(this.isLoginView) {

    } else {
      this.auth.signUp(authForm.value.email, authForm.value.password)
    }


    authForm.reset();

  }
}
