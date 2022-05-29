import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "./shared/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  constructor(private authService : AuthenticationService) { }

  title = 'studentClient';
  isLoggedIn = window.localStorage.getItem('token');

  ngOnInit(){
    Notification.requestPermission();
  }

}



