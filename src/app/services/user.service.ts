import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, concatMap, filter, map, of, range, switchMap, tap, toArray } from 'rxjs';
import { User } from '../models/User';
import { DataService } from './data.service';
import { TypedResponse } from '../models/Response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = '/users'; 
  users$!:Observable<User[]>;
  searchString$ = new BehaviorSubject<string | undefined>(undefined);
  searchedUsers$ = this.searchString$.pipe(
    switchMap((name) => this._getAllUsers().pipe(
      tap(e => {
        console.log({name, e})
      }),
      map(x => name ? this.searchByName(name)(x) : undefined)
    ))
  )
  constructor(private ds: DataService) {}

  getUsers(page: number){
    return this.ds.getData<TypedResponse<User[]>>(`${this.apiUrl}?page=${page}`, 15);
  }

  getUserById(id: number): Observable<any> {
    return this.ds.getData<TypedResponse<User>>(`${this.apiUrl}/${id}`, 1).pipe(
      map(res => res.data)
    );
  }
  private _getAllUsers() {
    return this.getUsers(1).pipe(
      switchMap((initialResponse) => {
        const totalPages = initialResponse.meta?.pagination.totalPages || 0;

        if (totalPages === 0) {
          return of([]); 
        }

        return range(1, totalPages).pipe(
          concatMap((pageIndex) => this.getUsers(pageIndex)),
          toArray(),
        ).pipe(
          map(e => e.map(x => x.data)),
          map(arr => arr.flat())
        );
      })
    );
  }
  searchByName(name: string) {
    return (e: User[]) => (e.map(x => ({...x, fullName: `${x.firstName.toLowerCase()} ${x.lastName.toLowerCase()}`})).filter(x => x.fullName.includes(name.toLowerCase()))) as User[]
  }
}

