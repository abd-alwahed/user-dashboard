import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Meta } from '@angular/platform-browser';
import {
  BehaviorSubject,
  Observable,
  combineLatest,
  map,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { Pagination } from 'src/app/models/Response';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent {
  page$ = new BehaviorSubject(1);
  users$!: Observable<User[]>;
  searchedUsers$ = Observable<User[]>;
  pagination$!: Observable<Pagination | null>;

  handlePageEvent({ pageIndex }: PageEvent) {
    this.page$.next(pageIndex + 1);
  }

  init() {
    
    this.userService.searchString$.subscribe(console.log);
    const sub = this.page$.pipe(
      switchMap((page) => this.userService.getUsers(page))
    );
    const users = sub.pipe(map((e) => e.data ));
    this.users$ = this.userService.searchedUsers$.pipe(
      switchMap(searchedUsesr => {
        if (searchedUsesr) {
          this.pagination$ = of(null);
          return of(searchedUsesr);
        }
        this.pagination$ = sub.pipe(map((e) => e.meta!.pagination));
        return users;
      })
    )

    
  }
  constructor(private userService: UserService) {
    this.init();
  }
}
function treat(a: any, b: any): import("rxjs").OperatorFunction<unknown, User[]> {
  throw new Error('Function not implemented.');
}

