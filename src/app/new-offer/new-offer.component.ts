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

  // constructor(private route: ActivatedRoute,
  //             private os: OfferService,
  //             private us: UserService,
  //             private location: Location) {
  // }
  //
  // @ViewChild('title') title!: ElementRef;
  // @ViewChild('description') description!: ElementRef;
  // @ViewChild('appointment1') appointment1!: ElementRef;
  // @ViewChild('appointment2') appointment2!: ElementRef;
  // @ViewChild('appointment3') appointment3!: ElementRef;
  // @ViewChild('subject') subject!: ElementRef;
  // @ViewChild('firstname') first_name!: ElementRef;
  // @ViewChild('lastname') last_name!: ElementRef;
  //
  // userId: any;
  // notification: any;
  // category: any;
  // offer?: any;
  // dateArray: Array<string> = ['', '', ''];
  //
  // ngOnInit(): void {
  //   const params = this.route.snapshot.params;
  //   if (params['id'])
  //     this.os.getSingle(params['id']).subscribe((o) => {
  //       this.offer = o;
  //       let arr = [];
  //       for (let appointment of this.offer.acf.appointments) {
  //         var temp = appointment.date.split("/");
  //         var to = temp[2] + "-" + temp[1] + "-" + temp[0];
  //         arr.push(to);
  //       }
  //       this.dateArray = arr;
  //     })
  //   this.us.getLoggedInUserId();
  //   this.us.userId?.subscribe((u) => {
  //     this.userId = u;
  //   })
  // }
  //
  // onChange(select: any): void {
  //   let s = select.target;
  //   this.category = s[s.selectedIndex].id;
  // }
  //
  // saveOffer(event: any, method: string) {
  //   event.preventDefault();
  //   const requestOptions = {
  //     method: method,
  //     headers: {
  //       "Authorization": "Bearer " + window.localStorage.getItem('token'),
  //       "Content-Type": "application/json",
  //     },
  //     redirect: 'follow',
  //     body: JSON.stringify({
  //       "title": this.title.nativeElement.value,
  //       "status": "publish",
  //       "categories": [this.category],
  //       "fields": {
  //         "title": this.title.nativeElement.value,
  //         "description": this.description.nativeElement.value,
  //         "appointments": [
  //           {
  //             "date": this.appointment1.nativeElement.value
  //           },
  //           {
  //             "date": this.appointment2.nativeElement.value
  //           },
  //           {
  //             "date": this.appointment3.nativeElement.value
  //           },
  //
  //         ],
  //         "subject": this.subject.nativeElement.value,
  //         "first_name": this.first_name.nativeElement.value,
  //         "last_name": this.last_name.nativeElement.value,
  //         "user": this.userId,
  //       },
  //     }),
  //   };
  //   if (method === 'PUT')
  //     this.saveRequest(requestOptions, this.offer.id)
  //   else this.saveRequest(requestOptions)
  //   }
  //
  //   private saveRequest(requestOptions:any, id?:number){
  //   let api = '';
  //   if(id)
  //     api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer/${id}`;
  //   else
  //     api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer`;
  //
  //   fetch(api, requestOptions)
  //       .then(function(response) {
  //           if (response.status != 201) {
  //               alert("Fehlgeschlagen! " + response.status);
  //               console.log(response);
  //               return false;
  //           } return response;
  //       })
  //     .then(offers => {
  //         this.title.nativeElement.value = "";
  //         this.description.nativeElement.value = "";
  //         this.appointment1.nativeElement.value = "";
  //         this.appointment2.nativeElement.value = "";
  //         this.appointment3.nativeElement.value = "";
  //         this.subject.nativeElement.value = "";
  //         this.first_name.nativeElement.value = "";
  //         this.last_name.nativeElement.value = "";
  //       }).then(offers => {
  //     navigator.serviceWorker.ready.then(function(registration) {
  //       if(!id) {
  //         const title = 'Erfolgreich angelegt';
  //         const options = {
  //           body: 'Dein Angebot wurde erfolgreich gespeichert!'
  //         };
  //         registration.showNotification(title, options);
  //       }
  //       else{
  //         const title = 'Erfolgreich aktualisiert';
  //         const options = {
  //           body: 'Dein Angebot wurde erfolgreich aktualisiert!'
  //         };
  //         registration.showNotification(title, options);
  //       }
  //     });
  //     })
  //     .then((offers) => this.location.back());
  // }
  //
  // public stepBack(): void{
  //   this.location.back();
  // }

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
  user_id = this.us.userId.getValue();
  errors: {  [key: string]: string } = {};
  isUpdatingOffer = false;
  loaded = false;

  ngOnInit(): void {
    const id = this.route.snapshot.params["id"];

    //UPDATE OFFER
    if (id) {
      this.isUpdatingOffer = true;
      this.os.getSingle(id).subscribe(offer => {
        this.offer = offer;
        this.initOffer();
        this.loaded = true;
      });
    }
    //NEW OFFER
    else{
      this.us.getLoggedInUserId();
      this.initOffer();
      this.loaded =  true;
    }
  }

  initOffer() {
    //SHOW EXISTING APPOINTMENTS FOR UPDATE
    this.buildAppointmentArray();

    //CREATE OFFER FORM
    this.offerForm = this.fb.group({
      id: this.offer.id,
      title: [this.offer.acf.title, [Validators.required, Validators.minLength(3)]],
      description: [this.offer.acf.description, [Validators.minLength(10), Validators.maxLength(1000)]],
      first_name: [this.offer.acf.first_name, [Validators.required, Validators.minLength(3)]],
      last_name: [this.offer.acf.last_name, [Validators.required, Validators.minLength(3)]],
      subject: [this.offer.acf.subject, [Validators.required]],
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

    let method = "";
    if (this.isUpdatingOffer) method = 'PUT';
    else{
      method = 'POST';
      offer.acf.user = this.user_id;
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
          "first_name": offer.acf.first_name,
          "last_name": offer.acf.last_name,
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
    this.offer.categories = s[s.selectedIndex].id;
  }

  public isLoggedIn() : boolean{
    return this.authService.isLoggedIn();
  }

  public stepBack() : void{
    this.location.back();
  }
}

