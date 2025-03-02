import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../services/auth/token.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

const BYPASS = ['/oauth/token', '/api/login'];

export const AuthInterceptor: HttpInterceptorFn = (req, next) => {
  const tokenService = inject(TokenService);
  const router = inject(Router);

  const requiresAuthentication = !BYPASS.some(url => req.url.includes(url));

  if (requiresAuthentication) {
    const token = tokenService.token;

    req = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(req).pipe(
    catchError(err => {
      if (err.status === 401) {
        router.navigate(['login'], {
          replaceUrl: true,
        });
      }
      // createToast({ type: "error", title: "Ops", subtitle: err.error?.msg || err.error?.message || "Algo de errado aconteceu, tente novamente mais tarde" })
      return throwError(() => err);
    })
  );
};
