import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user? : any;
  loaded = false;
  isLoggedIn = window.localStorage.getItem('token');


  constructor(private authService : AuthenticationService, private router : Router, private us : UserService) { }

  ngOnInit(): void {
    this.us.getLoggedInUser().then((u) => {
      this.user = u;
      this.loaded = true;
    })
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }
}
