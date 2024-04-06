import { NgModule } from '@angular/core';
import { UserDetailsComponentComponent } from './user-details.component';
import { MatCardModule } from '@angular/material/card';



@NgModule({
  declarations: [
   UserDetailsComponentComponent
  ],
  imports: [
    MatCardModule,
  ],
  exports:[UserDetailsComponentComponent]
})
export class UserDetailsModule { }
