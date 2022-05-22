import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../shared/offer.service";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer? : any;
  loggedInUserId? : any;

  constructor(private route : ActivatedRoute, private os : OfferService, private us : UserService) { }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o;
      console.log(this.offer)
    })
    this.us.getLoggedInUserId();
    this.us.userId?.subscribe((u) => {
      this.loggedInUserId = u;
    })

  }

}
