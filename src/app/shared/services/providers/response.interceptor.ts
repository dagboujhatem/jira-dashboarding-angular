import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';


@Injectable()
export class ResponseInterceptor implements HttpInterceptor {

  constructor(private router: Router,
    private toasterService: ToastrService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
     catchError((error: HttpErrorResponse) => {
        // Unauthenticated User error
        if (error.status === 401) {
          // reomve localStorage data
          localStorage.clear();
          this.toasterService.error(
          'Votre session a été expiré. Merci de refaire le login pour accéder à votre espace.',
           "La session a été expiré.");
          // redirect to the login route
          this.router.navigate(['/auth/login']);
        }
        // Not Found error
        if (error.status === 404) {
          this.router.navigate(['/error-page/error-400']);
        }
        // Server error
        if (error.status === 500) {
          this.router.navigate(['/error-page/error-500']);
        }
        return throwError(error);
      })
    );
  }
}
