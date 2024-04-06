import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Meta, Response } from '../models/Response';

@Injectable()
export class ResponseInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(map(this.transformResponse));
  }
  
    
  private transformResponse(event: HttpEvent<any>): HttpEvent<any> {
    if (
      event instanceof HttpResponse &&
      event.body &&
      event.body.hasOwnProperty('data')
    ) {        
      const snakeBody = snakeToCamelDeep(event.body);
      const meta: Meta | undefined = event.body.page ? {
        pagination: {
          page: snakeBody.page,
          perPage: snakeBody.perPage,
          total: snakeBody.total,
          totalPages: snakeBody.totalPages,
        }
      } : undefined;
      return event.clone({ body: {
        data: snakeBody.data,
        meta
      } });
    }
    return event;
  }
}


export const snakeToCamelDeep:any = (obj: any) =>  {
    if (obj && typeof obj === 'object') {
      if (Array.isArray(obj)) {
        return obj.map(snakeToCamelDeep) as any;
      } else {
        return Object.keys(obj).reduce((acc: any, key: string) => {
          const camelKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
          let value = obj[key];
          if (value && typeof value === 'object') {
            value = snakeToCamelDeep(value);
          }
          acc[camelKey] = value;
          return acc;
        }, {});
      }
    }
    return obj; 
  }