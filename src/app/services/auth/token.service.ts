import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class TokenService {

  static readonly BEARER_ACCESS = 'ac';

  constructor(private http: HttpClient) {}

  async setToken(value: {
    token: string;
    refresh: string;
    expires_in: number;
  }) {
    localStorage.setItem(TokenService.BEARER_ACCESS, value.token);
  }

  get token() {
    return localStorage.getItem(TokenService.BEARER_ACCESS);
  }

  clearTokens() {
    localStorage.removeItem(TokenService.BEARER_ACCESS);
  }

  private refreshToken(value: { refresh: string; expires_in: number }) {
    const url = 'nice://token';
    setTimeout(() => {
      this.http.post<any>(url, { refresh: value.refresh }).subscribe({
        next: (token) => {
          this.refreshToken({
            expires_in: token.expires_in,
            refresh: token.refresh_token,
          });
        },
      });
    }, value.expires_in);
  }
}
