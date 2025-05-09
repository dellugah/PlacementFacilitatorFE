import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

interface TokenData {
  token: string;
  homePage: string;
  expiresIn: number;
}

@Injectable({
  providedIn: 'root'
})
export class ConnectionService {
  private tokenSubject = new BehaviorSubject<TokenData>({
    token: '',
    homePage: '',
    expiresIn: 0
  });

  token$ = this.tokenSubject.asObservable();
  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  get token(): TokenData {
    return this.tokenSubject.getValue();
  }

  set token(value: TokenData) {
    this.tokenSubject.next(value);
  }

  private get headers(): HttpHeaders {
    const tokenValue = this.token.token ? `Bearer ${this.token.token}` : '';
    console.log(tokenValue);
    return new HttpHeaders()
      .set('Authorization', tokenValue)
      .set('Content-Type', 'application/json')
  }

  public async postConnection(data: any, endpoint: string) {
    try {
      return await firstValueFrom(
        this.http.post(`${this.baseUrl}${endpoint}`, data, {
          headers: this.headers
        })
      );
    } catch (error) {
      console.error('Error:', error);
      return {};
    }
  }

  public async getConnection(data: any, endpoint: string) {
    try {
      console.log('Authorization header:', this.headers.get('Authorization'));
      return await firstValueFrom(
        this.http.post(`${this.baseUrl}${endpoint}`, data, {
          headers: this.headers
        })
      );
    } catch (error) {
      console.error('Error:', error);
      return {};
    }
  }

  public async getLogIn() {
    try {
      return await firstValueFrom(
        this.http.get(`${this.baseUrl}users/me`, {
          headers: this.headers
        })
      );
    } catch (error) {
      console.error('Error:', error);
      return {};
    }
  }


}
