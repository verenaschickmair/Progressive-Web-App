import {Component, Input, OnInit, Output} from '@angular/core';
import {UserService} from "../shared/user.service";
import {OfferService} from "../shared/offer.service";
import {EventEmitter} from "@angular/core";

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.css']
})
export class OfferComponent implements OnInit {

  @Input() offer! : any;
  @Output() deleteEvent = new EventEmitter();
  public isLoggedIn = window.localStorage.getItem('token');
  private loginUserId = this.us.userId.getValue();

  constructor(private us : UserService, private os : OfferService) {
  }

  ngOnInit(): void {
    this.us.getLoggedInUserId();
  }

  deleteOffer(offer : any){
    window.alert("Willst du wirklich dein Angebot löschen?");
    console.log(offer.get("id"));
    this.os.deleteOffer(offer.get("id")).then((e) => {
      console.error("Wild!");
      this.deleteEvent.emit();
    });
  }

  public isOwner(authorId: number){
    return this.loginUserId === authorId;
  }
}
