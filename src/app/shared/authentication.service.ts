import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwt_decode from "jwt-decode";
import {BehaviorSubject, Observable} from 'rxjs';
import {Router} from "@angular/router";


interface Token {
  exp: number;
  user: {
    id: string;
  }
}

@Injectable()
export class AuthenticationService {

  private api_token = 'https://api.s1910456028.student.kwmhgb.at/wp-json/jwt-auth/v1/token';

  constructor(private router : Router) {  }

  login(credentials : Object) : void {
    fetch(this.api_token, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    }).then(function (response) {
      if (response.status != 200) {
        alert("Fehlgeschlagen! " + response.status);
        console.error("Fehlgeschlagen")
        console.error(response);
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

  logout() {
    window.localStorage.removeItem("token");
    window.localStorage.removeItem("user_display_name");
    console.log("Logged out");
  }

  public isLoggedIn() {
    if (window.localStorage.getItem("token")) {
      let token : string = <string> window.localStorage.getItem("token");
      const decodedToken = jwt_decode(token) as Token;
      let expirationDate: Date = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      if (expirationDate < new Date()) {
        console.log("token expired");
        window.localStorage.removeItem("token");
        window.localStorage.removeItem("user_display_name");
        return false;
      }
      return true;
    } else {
      return false;
    }
  }

  public isLoggedOut() {
    return !this.isLoggedIn();
  }

}
