import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";

interface AuthResponseData {
  kind: string,
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string
  localId: string
  registered?: boolean
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_KEY = environment.API_KEY

  signUpEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.API_KEY}`
  signInEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.API_KEY}`

  constructor(private http: HttpClient) {
  }

  signUp(email: string, password: string): Observable<Object> {
    return this.http.post<AuthResponseData>(this.signUpEndpoint,
      {
        email: email,
        password: password,
        returnSecuredToken: true
      })
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInEndpoint, {
      email: email,
      password: password,
      returnSecuredToken: true
    })
  }

}
