import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

const API_KEY = 'a6323a27878f20611431dd130b28a7b9';

@Injectable()
export class GlobalRequestInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    req = req.clone({ setParams: { apikey: API_KEY } });

    return next.handle(req);
  }
}
