import { Injectable } from '@angular/core';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private api_token = 'https://api.s1910456028.student.kwmhgb.at/wp-json/jwt-auth/v1/token';

  constructor(private router : Router) {  }

  getUser(credentials : Object) : void {
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

}
