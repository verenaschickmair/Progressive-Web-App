import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router : Router, private us : UserService) { }
  @ViewChild('username') username!: ElementRef;
  @ViewChild('password') password!: ElementRef;
  isLoggedIn = window.localStorage.getItem('token');

  ngOnInit(): void {
  }

  async login(event : Event){
    event.preventDefault();
    console.time("Login");

    let credentials = {
      username: this.username.nativeElement.value,
      password: this.password.nativeElement.value
    }
    if (credentials.username && credentials.password) {
        await this.authService.login(credentials);
        console.timeEnd("Login");
      }
    else{
      alert("Bitte Benutzername und Passwort eingeben!")
    }
  }
}
