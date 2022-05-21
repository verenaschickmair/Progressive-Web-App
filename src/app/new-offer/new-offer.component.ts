import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-new-offer',
  templateUrl: './new-offer.component.html',
  styleUrls: ['./new-offer.component.css']
})
export class NewOfferComponent implements OnInit {

  constructor() { }
  @ViewChild('title') title!: ElementRef;
  @ViewChild('description') description!: ElementRef;
  @ViewChild('appointment1') appointment1!: ElementRef;
  @ViewChild('appointment2') appointment2!: ElementRef;
  @ViewChild('appointment3') appointment3!: ElementRef;
  @ViewChild('subject') subject!: ElementRef;

  user : any;
  notification : any;

  ngOnInit(): void {
    this.fetchRecentUser();
  }

  fetchRecentUser(){
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    let options = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    // @ts-ignore
    fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/users/me", options)
      .then(response => response.json())
      .then(response => this.user = response)
      .catch(error => console.log('error', error));
  }

  saveOffer(event:any){
    console.log(this.user);
    event.preventDefault();
    const requestOptions = {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + window.localStorage.getItem('token'),
            "Content-Type": "application/json",
        },
        redirect: 'follow',
        body: JSON.stringify({
            "title": this.title.nativeElement.value,
            "status": "publish",
            "categories": [2],
            "fields":{
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
              "user": this.user,
            },
        }),
    };

    // @ts-ignore
    fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer", requestOptions)
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
        }).then(offers => {
      navigator.serviceWorker.ready.then(function(registration) {
        const title = 'Erfolgreich angelegt';
        const options = {
          body: 'Dein Angebot wurde erfolgreich gespeichert!'
        };
        registration.showNotification(title, options);
      });
      });
  }
}

