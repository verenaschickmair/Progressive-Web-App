import { Injectable } from '@angular/core';
import {Offer} from "./offer";
import {Validators} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OfferFactoryService {

  static empty() : Offer {
    return new Offer(0,[],'','publish', {title: '', description: '', user: 0, subject: '', phone: '', email: '', appointments:[]});
  }

  static fromObject (rawOffer: any) : Offer {
    return new Offer(
      rawOffer.id,
      rawOffer.categories,
      rawOffer.title,
      rawOffer.status,
      {
        title: rawOffer.title,
        description: rawOffer.description,
        user: rawOffer.user,
        subject: rawOffer.subject,
        phone: rawOffer.phone,
        email: rawOffer.email,
        appointments: rawOffer.appointments
      }
    );
  }


}
