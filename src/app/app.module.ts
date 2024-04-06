import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { UsersListComponent } from './components/users-list/users-list.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardContent, MatCardModule } from '@angular/material/card';
import { UserDetailsComponentComponent } from './components/user-details/user-details.component';
import {MatButtonModule} from '@angular/material/button';
import { HeaderModule } from './components/header/header.module';
import { httpInterceptors } from './http-interceptors';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from './shared/shared.module';
import {MatPaginatorModule} from '@angular/material/paginator';

@NgModule({
  declarations: [AppComponent, UsersListComponent,UserDetailsComponentComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    HeaderModule,
    StoreModule.forRoot({}, {}),
    SharedModule,
    MatPaginatorModule

    
    
  ],
  providers: [
    httpInterceptors
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}