import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';

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
  // private baseUrl =  'https://placementfacilitator-production.up.railway.app/api/';

  constructor(private http: HttpClient) {
    window.addEventListener('storage', (e) => {
      console.log('Storage changed:', {
        key: e.key,
        oldValue: e.oldValue,
        newValue: e.newValue
      });
    });
  }
  private clearSessionData(): void {
    sessionStorage.clear();
    console.log('Session storage cleared:', {
      token: this.getToken(),
      homePage: this.getHomePage(),
      expiresIn: this.getExpiresIn()
    });
  }


  private get headers(): HttpHeaders {
    const tokenValue = this.getToken() ? `Bearer ${this.getToken()}` : '';
    return new HttpHeaders()
      .set('Authorization', tokenValue)
      .set('Content-Type', 'application/json')
  }

  public async postConnection(data: any, endpoint: string) {
    try {
      const response = await firstValueFrom(
        this.http.post(this.baseUrl + endpoint, data, {
          headers: this.headers,
          observe: 'response'
        })
      );

      if (response.status === 200 && response.body) {
        return response.body;
      } else {
        throw new Error('Invalid response received');
      }
    } catch (error: any) {
      throw new Error('Invalid response received');
    }

  }

  public async getConnection(endpoint: string) {
    try {
      return await firstValueFrom(
        this.http.get(this.baseUrl + endpoint, {
          headers: this.headers
        })
      );
    } catch (error) {
      console.error('Error accessing endpoint:', error);
      return {};
    }
  }

  public async getStudList<T = any[]>(endpoint: string): Promise<T> {
    try {
      const response = await firstValueFrom(
        this.http.get<T>(this.baseUrl + endpoint, {
          headers: this.headers
        })
      );
      // Return the actual array from the Zone.js wrapper
      return (response as any).__zone_symbol__value || response;
    } catch (error: any) {
      console.error('Connection error:', {
        status: error?.status,
        message: error?.message,
        headers: this.headers.keys(),
        tokenPresent: !!this.getToken()
      });
      // Don't return empty object on error, throw or return error details
      throw error;
    }
  }

  public async getProfile() {
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

  public async logout() {
    this.clearSessionData();
  }
}
