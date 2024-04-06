import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import { Observable, debounceTime, distinctUntilChanged } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
 
})
export class HeaderComponent  {
  searchString?: string;
  inputControl = new FormControl();
  inputObservable$?: Observable<string>; 



  constructor(private userService: UserService) {
  } 
  ngOnInit(): void {
    this.inputObservable$ = this.inputControl.valueChanges.pipe(
      debounceTime(300), 
      distinctUntilChanged()
    );
    
    this.inputObservable$.subscribe(value => {
      this.userService.searchString$.next(value);
      this.inputControl.setValue(value, { emitEvent: false });
    });
  }
  
  
}