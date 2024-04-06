import {Provider} from '@angular/core';
import {HTTP_INTERCEPTORS} from '@angular/common/http';

import {LoadingInterceptor} from './loading.interceptor';
import { BaseUrlInterceptor } from './base-url.interceptor';
import { ResponseInterceptor } from './response.interceptor';

export const httpInterceptors: Provider [] = [
 {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: ResponseInterceptor, multi: true},
];
