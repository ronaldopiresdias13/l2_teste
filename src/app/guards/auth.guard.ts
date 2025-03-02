import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  canActivate(): Observable<boolean> {
    if (!this.authService.getUser()?.person) {
      this.router.navigate(['/login']);
      return of(false);
    }
    return of(true);
  }
}
