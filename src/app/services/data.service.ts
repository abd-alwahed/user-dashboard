// data.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, shareReplay } from 'rxjs/operators';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private http: HttpClient, private cacheService: CacheService) {}

  getData<T>(url: string, ttlSeconds: number): Observable<T> {
    return this.cacheService.get<T>(url).pipe(
      switchMap((cachedData) => {
        if (cachedData !== null) {
          return of(cachedData);
        }
        return this.http.get<T>(url).pipe(
          shareReplay(1), // Cache the HTTP response
          switchMap((data) => {
            this.cacheService.set<T>(url, data, ttlSeconds);
            this.cacheService.onRefresh(url);
            return of(data);
          })
        );
      })
    );
  }

  clearCache(): void {
    this.cacheService.clear();
  }
}
