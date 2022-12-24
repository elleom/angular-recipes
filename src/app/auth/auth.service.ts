import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  API_KEY = environment.API_KEY

  db = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithCustomToken?key=${this.API_KEY}`
  constructor(private http: HttpClient) {
  }

  signUp(email, password) {
    this.http.get(this.db, {})
  }

}
