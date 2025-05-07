import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  get token(): { token: string; homePage: string; expiresIn: number } {
    return this._token;
  }

  set token(value: { token: string; homePage: string; expiresIn: number }) {
    this._token = value;
  }

  constructor(private http: HttpClient) { }

  private _token : { token: string; homePage: string; expiresIn: number } = {
    token: ''
    ,
    expiresIn: 0
    ,
    homePage: ''
  };

  private postHeaders = new HttpHeaders()
    .set('Authorization', this._token.token)
    .set('Content-Type', 'application/json')
    .set('X-Requested-With', 'XMLHttpRequest');


  public async postConnection(data: any, endpoint : string) {
    try {
      return await firstValueFrom(
        this.http.post('http://localhost:8080/api/' + endpoint, data, {
          headers: this.postHeaders
        })
      );
    } catch (error) {
      // Handle error appropriately
      console.error('Error:', error);
      return {};
    }
  }

  public async getConnection(data : any, endpoint : string) {
    try {
      return await firstValueFrom(
        this.http.post('http://localhost:8080/api/' + endpoint, data, {
          headers: this.postHeaders
        })
      );
    } catch (error) {
      // Handle error appropriately
      console.error('Error:', error);
      return {};
    }
  }


}
