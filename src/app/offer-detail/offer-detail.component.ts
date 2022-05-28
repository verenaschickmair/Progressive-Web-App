import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../shared/offer.service";
import {UserService} from "../shared/user.service";
import {CommentService} from "../shared/comment.service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CommentFactoryService} from "../shared/comment-factory";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer? : any;
  comments? : any[];
  loggedInUserId? = 0;
  loaded = false;
  commentForm : FormGroup;
  isLoggedIn = window.localStorage.getItem('token');

  constructor(private route : ActivatedRoute,
              private os : OfferService,
              private us : UserService,
              private cs: CommentService,
              private fb: FormBuilder) {
    this.commentForm = this.fb.group({});

  }

  ngOnInit(): void {
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o;
      this.cs.getAll().then((comments) => {
        this.checkOfferId(comments);
        this.us.getLoggedInUserId().then((userId) => {
          this.loggedInUserId = userId;
          this.loaded = true;
        });
      });

      })
  }

  checkOfferId(comments : any){
    let arr = [];
    for(let comment of comments){
      if(comment.acf.offer[0] === this.offer.id){
        arr.push(comment);
      }
    }
    this.comments = arr;
  }
}
