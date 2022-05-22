import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import {BehaviorSubject, Observable} from "rxjs";
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_token = 'https://api.s1910456028.student.kwmhgb.at/wp-json/jwt-auth/v1/token';
  user? = new BehaviorSubject({});
  userId? = new BehaviorSubject(0);

  constructor(private router: Router) {
  }

  getUser(credentials: Object): void {
    fetch(this.api_token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(function (response) {
      console.log(response.status)
      if (response.status != 200) {
        alert("Fehlgeschlagen! " + response.status);
        console.log("Fehlgeschlagen")
        console.log(response);
        return false;
      }
      return response; // im response ist token drinnen
    }).then(response => {
      if (response != false) response.json().then(response => {
        console.log(response)
        window.localStorage.setItem("token", response.token);
        window.localStorage.setItem("user_display_name", response.user_display_name);
        console.log(window.localStorage.getItem("token"));
        this.router.navigateByUrl("profile")
      })
    });
  }

  getLoggedInUser() : void {
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
      .then(response => this.user?.next(response))
      .catch(error => console.log('error', error));
  }

  getLoggedInUserId() : void {
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
      .then(response => this.userId?.next(response.id))
      .catch(error => console.log('error', error));
  }
}
