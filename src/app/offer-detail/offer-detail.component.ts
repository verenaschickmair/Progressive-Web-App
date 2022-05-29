import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {OfferService} from "../shared/offer.service";
import {UserService} from "../shared/user.service";
import {CommentService} from "../shared/comment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {CommentFactoryService} from "../shared/comment-factory";
import {CommentFormErrorMessages} from "./offer-detail-error-messages";
import {Comment} from "../shared/comment";
import {OfferFactoryService} from "../shared/offer-factory";

@Component({
  selector: 'app-offer-detail',
  templateUrl: './offer-detail.component.html',
  styleUrls: ['./offer-detail.component.css']
})
export class OfferDetailComponent implements OnInit {
  offer? : any;
  comments? : any[];
  user? : any;
  loaded = false;
  commentForm : FormGroup;
  isLoggedIn = window.localStorage.getItem('token');
  loginUser? : any;
  errors: {  [key: string]: string } = {};

  constructor(private route : ActivatedRoute,
              private os : OfferService,
              private us : UserService,
              private cs: CommentService,
              private fb: FormBuilder) {
    this.commentForm = this.fb.group({});

  }

  ngOnInit(): void {
    console.clear();
    const params = this.route.snapshot.params;
    this.os.getSingle(params['id']).subscribe((o) => {
      this.offer = o;
      this.offer.date = new Date(this.offer.date).toLocaleDateString('de-DE');
      this.us.getUserById(this.offer.acf.user).then((u) => {
        this.user = u;
        if(this.isLoggedIn){
          this.us.getLoggedInUser().then((u) => {
            this.loginUser = u;
          });
        }
        this.renderComments();
      });
      this.commentForm = this.fb.group({
        text: new FormControl("", [Validators.required, Validators.minLength(10)])
      });
      //CHECKING FOR ERRORS
      this.commentForm.statusChanges.subscribe(() =>
        this.updateErrorMessages()
      )
    })
  }

  renderComments(){
    this.cs.getAll().then((comments) => {
      this.checkOfferId(comments);
      this.loaded = true;
    });

  }

  updateErrorMessages() {
    this.errors = {};

    for (const message of CommentFormErrorMessages) {
      const control = this.commentForm.get(message.forControl);
      if (
        control &&
        control.dirty &&
        control.invalid && control.errors &&
        control.errors[message.forValidator] &&
        !this.errors[message.forControl]
      ) {
        this.errors[message.forControl] = message.text;
      }
    }
  }

  public addComment(): void{
    if(this.loginUser.id) {
      this.updateErrorMessages();
      const comment: Comment = CommentFactoryService.fromObject(this.commentForm.value);
      comment.fields.user = this.loginUser.id;
      comment.fields.offer = [this.offer.id];
      comment.status = "publish";
      comment.title = "Comment User " + comment.fields.user + " for Offer " + comment.fields.offer[0]
      console.log(comment);

      this.cs.createComment(comment).then((c) => {
        this.commentForm.reset(OfferFactoryService.empty());
        new Notification("Kommentar erfolgreich verfasst!");
        this.renderComments();
      })
    }
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
