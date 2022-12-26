export class User {
  constructor(
    public email: string,
    public localId: string,
    private _idToken: string,
    private _tokenExpirationDate: Date
  ) {}

  get token(): string {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate)
    return this._idToken
  }

  get expirationTime() {
    return this._tokenExpirationDate
  }
}
