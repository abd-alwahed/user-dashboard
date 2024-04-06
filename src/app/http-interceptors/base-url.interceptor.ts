import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoadingService } from '../services/loading.service';
import { finalize, map } from 'rxjs/operators';
import { NO_LOADER_TOKEN } from '../http-context/tokens';
import { API_URL } from '../environment/constants';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const modifiedRequest = req.clone({
        url: `${API_URL}${req.url}`
    })
    return next.handle(modifiedRequest)
    
  }
 

}
