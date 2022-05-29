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
  isLoggedIn = window.localStorage.getItem('token');
  loginUser? : any;
  user? : any;
  loaded = false;

  constructor(private us : UserService, private os : OfferService) {
  }

  ngOnInit(): void {
    if(this.offer.get("user")) {
      this.offer.set("date", new Date(this.offer.get("date")).toLocaleDateString('de-DE'));
      this.us.getUserById(this.offer.get("user")).then((user) => {
        this.user = user;
        if(this.isLoggedIn){
          this.us.getLoggedInUser().then((user) => {
            this.loginUser = user;
            console.table(this.loginUser);
            this.loaded = true;
          });
        }
        else this.loaded = true;
      })
    }
    else this.loaded = true;
  }

  deleteOffer(offer : any){
    window.alert("Willst du wirklich dein Angebot löschen?");
    console.log(offer.get("id"));
    this.os.deleteOffer(offer.get("id")).then((e) => {
      console.info("Wild!");
      this.deleteEvent.emit();
    });
  }

  public isOwner(authorId: number){
    if(this.isLoggedIn)
      return this.loginUser.id === authorId;
    return false;
  }
}
