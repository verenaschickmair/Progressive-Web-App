import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from "../shared/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private authService : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn()
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }



}
