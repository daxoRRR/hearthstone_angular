import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpModule} from '@angular/http';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { CardsComponent } from './cards/cards.component';
import { ContactsComponent } from './contacts/contacts.component';
import { NgxPaginationModule } from 'ngx-pagination';

import {HttpService} from "./cards/cards.service";

const appRoute: Routes = [
  {path:"", component: HomeComponent},
  {path:"cards", component: CardsComponent},
  {path:"contacts", component: ContactsComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CardsComponent,
    ContactsComponent
  ],
  imports: [
    BrowserModule,
    NgxPaginationModule,
    HttpModule,
    RouterModule.forRoot(appRoute)
  ],
  providers: [HttpService],
  bootstrap: [AppComponent]
})
export class AppModule { }
