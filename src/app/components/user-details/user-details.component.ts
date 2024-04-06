import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],

})
export class UserDetailsComponentComponent implements OnInit {
  user$!: Observable<User | null>;

  constructor(private route: ActivatedRoute, private userService: UserService,private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.userService.getUserById(this.route.snapshot.params['id']).pipe(
      tap((user) => console.log(user))
    );
  }

  backToHome(): void{
    this.router.navigate(['/users']);
  }
}