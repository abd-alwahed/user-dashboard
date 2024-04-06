import { NgModule } from '@angular/core';
import { AsyncPipe, CommonModule } from '@angular/common';

import { HeaderComponent } from './header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
   HeaderComponent
  ],
  imports: [
    FormsModule,ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatIconModule, CommonModule
  ],
  exports:[HeaderComponent]
})
export class HeaderModule { }
