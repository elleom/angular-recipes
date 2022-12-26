import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthResponseData, AuthService} from "./auth.service";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";
import {Observable} from "rxjs";


@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  isLoginView = true;
  error = false;
  errorMessage: string;
  isLoading: boolean = false;


  constructor(private auth: AuthService, private router: Router) {
  }

  onSwitchMode() {
    this.isLoginView = !this.isLoginView;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    this.error = false;

    let authObs: Observable<AuthResponseData>

    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginView) {
      authObs = this.auth.signIn(email, password)
    } else {
      authObs = this.auth.signUp(email, password)
    }

    authObs.subscribe(responseData => {
      this.isLoading = false

    }, logInError => {
      this.error = true;
      this.errorMessage = logInError
      this.isLoading = false
    })
    authForm.reset();
  }
}
