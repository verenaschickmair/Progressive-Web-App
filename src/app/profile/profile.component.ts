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

  constructor(private authService : AuthenticationService, private router : Router, private us : UserService) { }

  ngOnInit(): void {
    this.us.getLoggedInUser();
    this.us.user?.subscribe((u) => {
      this.user = u;
    })
  }

  isLoggedIn() : boolean {
    return this.authService.isLoggedIn()
  }

  logout() : void{
    this.authService.logout();
    this.router.navigateByUrl("/login");
  }

  // private generateUserImage(): string {
  //   const div = document.createElement('div')
  //   div.innerHTML = this.user.avatar_urls["96"];
  //   const img = div.querySelector('img')
  //   return img!.src;
  // }



}
