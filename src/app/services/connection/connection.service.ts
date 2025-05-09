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

  private readonly TOKEN_KEY = 'auth_token';
  private readonly HOME_PAGE_KEY = 'homePage';
  private readonly EXPIRES_IN_KEY = 'expiresIn';


  setToken(token: string): void {
    sessionStorage.setItem(this.TOKEN_KEY, token);
  }

  setHomePage(homePage: string): void {
    sessionStorage.setItem(this.HOME_PAGE_KEY, homePage);
  }

  setExpiresIn(expiresIn: number): void {
    sessionStorage.setItem(String(this.EXPIRES_IN_KEY), String(expiresIn));
  }

  getHomePage(): string | null{
    return sessionStorage.getItem(this.HOME_PAGE_KEY);
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.TOKEN_KEY);
  }

  getExpiresIn(): number | null{
    const value = sessionStorage.getItem(this.EXPIRES_IN_KEY);
    return value ? Number(value) : null;
  }

  private baseUrl = 'http://localhost:8080/api/';

  constructor(private http: HttpClient) {}

  private get headers(): HttpHeaders {
    const tokenValue = this.getToken() ? `Bearer ${this.getToken()}` : '';
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
      console.log('Authorization header:', this.headers.get('Authorization'));
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
