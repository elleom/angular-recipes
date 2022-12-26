import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

export interface AuthResponseData {
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

  signUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(this.signUpEndpoint,
      {
        email: email,
        password: password,
        returnSecuredToken: true
      })
      .pipe(catchError(this.handleError))
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(this.signInEndpoint, {
      email: email,
      password: password,
      returnSecuredToken: true
    }).pipe(catchError(this.handleError))
  }

  private handleError(errorResponse: HttpErrorResponse) {
    let errorMessage = 'Something went wrong'
    if (!errorResponse.error || !errorResponse.error.error) {
      return throwError(errorMessage)
    }
    switch (errorResponse.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('Email in use')
      case 'INVALID_PASSWORD':
      case 'EMAIL_NOT_FOUND':
        return throwError('Wrong Credentials')
      default:
        return throwError(errorMessage);
    }
  }

}
