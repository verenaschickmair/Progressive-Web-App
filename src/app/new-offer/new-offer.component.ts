import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Location} from '@angular/common';
import {AuthenticationService} from "../shared/authentication.service";
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {OfferService} from "../shared/offer.service";
import {Offer} from "../shared/offer";
import {OfferFactoryService} from "../shared/offer-factory";
import {NewOfferErrorMessages} from "./new-offer-error-messages";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {

  constructor(private authService : AuthenticationService,
              private location: Location,
              private fb: FormBuilder,
              private os: OfferService,
              private route: ActivatedRoute,
              private us: UserService) {
    this.offerForm = this.fb.group({});
    this.appointments = this.fb.array([]);
  }

  offerForm: FormGroup;
  offer = OfferFactoryService.empty();
  appointments: FormArray;
  isLoggedIn = window.localStorage.getItem('token');
  loginUser : any;
  categories : number[] = [];
  errors: {  [key: string]: string } = {};
  isUpdatingOffer = false;
  loaded = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];
    this.us.getLoggedInUser().then((u) => {
      this.loginUser = u;

      //UPDATE OFFER
      if (id) {
        this.isUpdatingOffer = true;
        this.os.getSingle(id).subscribe(offer => {
          this.offer = offer;
          this.categories = offer.categories;
          this.initOffer();
          this.loaded = true;
        });
      }
      //NEW OFFER
      else {
        this.initOffer();
        this.loaded = true;
      }
    });
  }

  initOffer() {
    //SHOW EXISTING APPOINTMENTS FOR UPDATE
    this.buildAppointmentArray();

    //CREATE OFFER FORM
    this.offerForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.acf.title, [Validators.required, Validators.minLength(3)]],
      description: [this.offer.acf.description, [Validators.minLength(10), Validators.maxLength(1000)]],
      subject: [this.offer.acf.subject, [Validators.required]],
      phone: [this.offer.acf.phone, [Validators.required]],
      email: [this.offer.acf.email, [Validators.required]],
      categories: this.offer.categories,
      user: this.offer.acf.user,
      appointments: this.appointments,
    });

    //CHECKING FOR ERRORS
    this.offerForm.statusChanges.subscribe(() =>
      this.updateErrorMessages()
    )
  }

  buildAppointmentArray() {
    if (this.offer.acf.appointments && this.offer.acf.appointments.length) {
      this.appointments = new FormArray([]);
      for (let appointment of this.offer.acf.appointments) {
        let temp = appointment.date.split("/");
        let date = temp[2] + "-" + temp[1] + "-" + temp[0];

        let fg = new FormGroup({
          'date': new FormControl(date, [Validators.required]),
        });
        this.appointments.push(fg);
      }
    }
    else{
      this.addAppointmentControl();
    }
  }

  //ADD EMPTY APPOINTMENT
  addAppointmentControl() {
    this.appointments.push(this.fb.group(
      {
        'date': new FormControl(["", Validators.required]),
      }
    ));
  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of NewOfferErrorMessages) {
      const control = this.offerForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  submitForm() {
    let offer: Offer = OfferFactoryService.fromObject(this.offerForm.value);
    offer.title = offer.acf.title;
    offer.status = "publish";
    offer.categories = this.categories;

    let method = "";
    if (this.isUpdatingOffer) method = 'PUT';
    else{
      method = 'POST';
      offer.acf.user = this.loginUser.id;
    }

    let headers = new Headers();
    headers.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "*/*");

    const requestOptions = {
      method: method,
      headers: headers,
      redirect: 'follow',
      body: JSON.stringify({
        "title": offer.title,
        "status": offer.status,
        "categories": offer.categories,
        "fields": {
          "title": offer.acf.title,
          "description": offer.acf.description,
          "appointments": offer.acf.appointments,
          "subject": offer.acf.subject,
          "phone": offer.acf.phone,
          "email": offer.acf.email,
          "user": offer.acf.user,
        },
      }),
    };

    if (this.isUpdatingOffer)
      this.saveRequest(requestOptions, offer.id)
    else this.saveRequest(requestOptions)
    }

    private saveRequest(requestOptions:any, id?:number){

    let api = "";
    if(this.isUpdatingOffer){
      api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer/${id}`;
    }
    else{
      api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer`;
    }

    fetch(api, requestOptions)
        .then(function(response) {
            if (response.status != 201 && response.status != 200) {
                alert("Fehlgeschlagen! " + response.status);
                console.log(response);
                return false;
            } return response;
        })
      .then(offers => {
        this.offer = OfferFactoryService.empty();
        this.offerForm.reset(OfferFactoryService.empty());
      }).then(offers => {
      navigator.serviceWorker.ready.then(function(registration) {
        if(!id) {
          const title = 'Erfolgreich angelegt';
          const options = {
            body: 'Dein Angebot wurde erfolgreich gespeichert!'
          };
          registration.showNotification(title, options);
        }
        else{
          const title = 'Erfolgreich aktualisiert';
          const options = {
            body: 'Dein Angebot wurde erfolgreich aktualisiert!'
          };
          registration.showNotification(title, options);
        }
      });
      })
      .then((offers) => this.location.back());
  }

  onChange(select: any): void {
    let s = select.target;
    this.categories = s[s.selectedIndex].id;
  }

  public stepBack() : void{
    this.location.back();
  }
}

