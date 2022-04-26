import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private translate: TranslateService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = localStorage.getItem('token');
    const currentLang = this.translate.currentLang;
    let headers = {};
    if(currentLang != undefined){
      headers['Accept-Language'] = `${currentLang}`;
    }
    if (token != null) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    const newRequest = request.clone({
      setHeaders: headers
    })
    return next.handle(newRequest);
  }

}
