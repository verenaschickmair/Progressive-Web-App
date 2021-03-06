import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from "./app.routing";
import { OfferListComponent } from './offer-list/offer-list.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { OfferDetailComponent } from './offer-detail/offer-detail.component';
import {ReactiveFormsModule} from "@angular/forms";
import {AuthenticationService} from "./shared/authentication.service";
import {HttpClientModule} from "@angular/common/http";
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { NewOfferComponent } from './new-offer/new-offer.component';
import { OfferComponent } from './offer/offer.component';
import { CommentComponent } from './comment/comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    OfferListComponent,
    LoginComponent,
    ProfileComponent,
    OfferDetailComponent,
    NewOfferComponent,
    OfferComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, HttpClientModule, ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
  enabled: environment.production,
  // Register the ServiceWorker as soon as the application is stable
  // or after 30 seconds (whichever comes first).
  registrationStrategy: 'registerWhenStable:30000'
})
  ],
  providers: [AuthenticationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
