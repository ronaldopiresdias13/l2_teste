import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, mergeMap, of, tap } from 'rxjs';
import { LoadingService } from '../../shared/utils/loading';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // apiUrl = 'https://apiservicedesk.geminissolucoes.com.br/api';
  // apiUrl = 'https://api.servicedeskapp.com.br/api';
  apiUrl = 'http://localhost:8000/api';
  private _logged = false;

  constructor(
    private http: HttpClient,
    private router: Router,
    private loadingService: LoadingService,
    private tokenService: TokenService,
  ) { }

  set logged(v: boolean) {
    this._logged = v;
  }

  get logged() {
    return this._logged;
  }

  login(data: any): Observable<any> {
    return this.loadingService.observe(this.http.post<any>(`${this.apiUrl}/login`, data).pipe(
      mergeMap((res) => {
        this.tokenService.setToken({
          token: res.access_token,
          refresh: res.refresh_token,
          expires_in: res.expires_in,
        });
        this._logged = true;
        return this.setUser();
      })));
  }

  refresh(): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/refresh`, {});
  }

  me(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/me`, {});
  }

  // forgotPassword(data: any) {
  //   return this.http.post<any>(`${this.apiUrl}/forgot-password`, data);
  // }

  logout(): Observable<any> {
    return this.loadingService.observe(this.http.post<any>(`${this.apiUrl}/me/logout`, {}).pipe(
      mergeMap((res) => {
        this.tokenService.setToken({
          token: res.access_token,
          refresh: res.refresh_token,
          expires_in: res.expires_in,
        });
        this._logged = false;
        this.removeUserInfo();
        return this.router.navigate(['/login']);
      })));
  }

  setUser(): Observable<any> {
    return this.me().pipe(
      tap(user => localStorage.setItem('nu', JSON.stringify(user.data))),
      catchError(() => of(null))
    );
  }

  getUser() {
    const userString = localStorage.getItem('nu');
    return userString ? JSON.parse(userString) : null;
  }

  destroyToken() {
    localStorage.removeItem('authToken');
  }

  removeUserInfo() {
    localStorage.removeItem('nu');
  }

  forgotPassword(email: string): Observable<any> {
    return this.loadingService.observe(this.http.post(`${this.apiUrl}/forgot-password`, { email }));
  }
}
