import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../shared/offer.service";
import {UserService} from "../shared/user.service";
import {Location} from '@angular/common';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {

  constructor(private route: ActivatedRoute,
              private os: OfferService,
              private us: UserService,
              private location: Location) {
  }

  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('appointment1') appointment1!: ElementRef;
  @ViewChild('appointment2') appointment2!: ElementRef;
  @ViewChild('appointment3') appointment3!: ElementRef;
  @ViewChild('subject') subject!: ElementRef;
  @ViewChild('firstname') first_name!: ElementRef;
  @ViewChild('lastname') last_name!: ElementRef;

  userId: any;
  notification: any;
  category: any;
  offer?: any;
  dateArray: Array<string> = ['', '', ''];

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    if (params['id'])
      this.os.getSingle(params['id']).subscribe((o) => {
        this.offer = o;
        let arr = [];
        for (let appointment of this.offer.acf.appointments) {
          var temp = appointment.date.split("/");
          var to = temp[2] + "-" + temp[1] + "-" + temp[0];
          arr.push(to);
        }
        this.dateArray = arr;
      })
    this.us.getLoggedInUserId();
    this.us.userId?.subscribe((u) => {
      this.userId = u;
    })
  }

  onChange(select: any): void {
    let s = select.target;
    this.category = s[s.selectedIndex].id;
  }

  saveOffer(event: any, method: string) {
    event.preventDefault();
    const requestOptions = {
      method: method,
      headers: {
        "Authorization": "Bearer " + window.localStorage.getItem('token'),
        "Content-Type": "application/json",
      },
      redirect: 'follow',
      body: JSON.stringify({
        "title": this.title.nativeElement.value,
        "status": "publish",
        "categories": [this.category],
        "fields": {
          "title": this.title.nativeElement.value,
          "description": this.description.nativeElement.value,
          "appointments": [
            {
              "date": this.appointment1.nativeElement.value
            },
            {
              "date": this.appointment2.nativeElement.value
            },
            {
              "date": this.appointment3.nativeElement.value
            },

          ],
          "subject": this.subject.nativeElement.value,
          "first_name": this.first_name.nativeElement.value,
          "last_name": this.last_name.nativeElement.value,
          "user": this.userId,
        },
      }),
    };
    if (method === 'PUT')
      this.saveRequest(requestOptions, this.offer.id)
    else this.saveRequest(requestOptions)
    }

    private saveRequest(requestOptions:any, id?:number){
    let api = '';
    if(id)
      api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer/${id}`;
    else
      api = `https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer`;

    fetch(api, requestOptions)
        .then(function(response) {
            if (response.status != 201) {
                alert("Fehlgeschlagen! " + response.status);
                console.log(response);
                return false;
            } return response;
        })
      .then(offers => {
          this.title.nativeElement.value = "";
          this.description.nativeElement.value = "";
          this.appointment1.nativeElement.value = "";
          this.appointment2.nativeElement.value = "";
          this.appointment3.nativeElement.value = "";
          this.subject.nativeElement.value = "";
          this.first_name.nativeElement.value = "";
          this.last_name.nativeElement.value = "";
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

  public stepBack(): void{
    this.location.back();
  }
}

