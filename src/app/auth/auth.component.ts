import {Component} from "@angular/core";
import {NgForm} from "@angular/forms";
import {AuthService} from "./auth.service";
import {map} from "rxjs/operators";


@Component({
  selector: 'app-auth',
  templateUrl: 'auth.component.html'
})
export class AuthComponent {
  isLoginView = true;
  error = false;
  errorMessage: string;
  isLoading: boolean = false;

  constructor(private auth: AuthService) {
  }

  onSwitchMode() {
    this.isLoginView = !this.isLoginView;
  }

  onSubmit(authForm: NgForm) {
    this.isLoading = true;
    this.error = false;
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    if (this.isLoginView) {
      this.auth.signIn(email, password).subscribe(responseData => {
        this.isLoading = false
      }, logInError => {
        this.error = true;
        this.errorMessage = logInError.error.error.message;
        this.isLoading = false
      })
    } else {
      this.auth.signUp(email, password)
        .subscribe(async responseData => {
          this.isLoading = false
        }, registrationError => {
          this.error = true;
          this.errorMessage = registrationError.error.message;
          this.isLoading = false
        })
    }
    authForm.reset();
  }
}
