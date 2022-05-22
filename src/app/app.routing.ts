import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {HomeComponent} from "./home/home.component";
import {OfferListComponent} from "./offer-list/offer-list.component";
import {LoginComponent} from "./login/login.component";
import {ProfileComponent} from "./profile/profile.component";
import {OfferDetailComponent} from "./offer-detail/offer-detail.component";
import {RequestListComponent} from "./request-list/request-list.component";
import {RequestDetailComponent} from "./request-detail/request-detail.component";
import {NewOfferComponent} from "./new-offer/new-offer.component";
import {NewRequestComponent} from "./new-request/new-request.component";


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'offers', component: OfferListComponent },
  { path: 'requests', component: RequestListComponent },
  { path: 'login', component: LoginComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'offer/:id', component: OfferDetailComponent },
  { path: 'new-offer', component: NewOfferComponent },
  { path: 'edit-offer/:id', component: NewOfferComponent },
];

@NgModule ({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: []

})

export class AppRoutingModule { }
