import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class ReplaceToMockInterceptor implements HttpInterceptor {


  // TODO: Should came from a config file with a config service (or value).
  private static replaceTargetToken = "api";
  private static mockDataSource = "http://localhost:4200/assets/mock";

    constructor() { }
    
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestTokens = request.url.split('/');
    if (requestTokens.length >= 2 && requestTokens[1] === ReplaceToMockInterceptor.replaceTargetToken) {
      // Request starts with the api, so it needs to replace with mock url.
      const newUrl = `${ReplaceToMockInterceptor.mockDataSource}/${requestTokens.filter(x => x !== requestTokens[1]).join('/')}.json`;
      request = request.clone({
        url: newUrl
      })
    }
    return next.handle(request);
  }
}
