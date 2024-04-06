// cache.service.ts
import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { tap, filter } from 'rxjs/operators';

interface CacheItem<T> {
  data: T;
  expiry: number; // Timestamp when the data expires
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private cache = new Map<string, CacheItem<any>>();
  private refresh$ = new Subject<string>();

  constructor() {}

  get<T>(key: string): Observable<T | null> {
    const item = this.cache.get(key);
    if (item && item.expiry > Date.now()) {
      return of(item.data as T);
    }
    this.cache.delete(key); 
    return of(null);
  }

  set<T>(key: string, data: T, ttlSeconds: number): void {
    const expiry = Date.now() + ttlSeconds * 1000;
    const item: CacheItem<T> = { data, expiry };
    this.cache.set(key, item);
    this.refresh$.next(key); 
  }

  clear(): void {
    this.cache.clear();
  }

  onRefresh(key: string): Observable<string> {
    return this.refresh$.pipe(
      filter((refreshKey) => refreshKey === key),
      tap(() => this.cache.delete(key)) 
    );
  }
}
