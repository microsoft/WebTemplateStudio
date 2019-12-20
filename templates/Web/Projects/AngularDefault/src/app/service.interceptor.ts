import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ServiceInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // WTS TODO: You can personalize your http interception (token for login, handle errors, redirections, loggers ...)
    // More information in:
    // https://angular.io/api/common/http/HttpInterceptor
    // https://blog.angulartraining.com/http-interceptors-in-angular-61dcf80b6bdd

    return next.handle(req);
  }
}
