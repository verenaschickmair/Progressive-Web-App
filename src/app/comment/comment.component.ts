import {ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {Comment} from "../shared/comment";
import {UserService} from "../shared/user.service";
import {AuthenticationService} from "../shared/authentication.service";
import {CommentService} from "../shared/comment.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() comment! : any;
  @Output() deleteEvent = new EventEmitter();
  user? : any;
  loginUser? : any;
  loaded = false;


  constructor(private us : UserService,
              private authService : AuthenticationService,
              private cs : CommentService,
              private router : Router) { }

  ngOnInit(): void {
    this.us.getLoggedInUser()
      .then((loginUser) => {
        this.loginUser = loginUser;
        this.us.getUserById(this.comment.acf.user)
          .then((user) => {
            console.log(user)
          this.user = user;
          this.comment.date = new Date(this.comment.date).toLocaleDateString('de-DE');
          this.loaded = true;
        })
      });
  }

  isCurrentUserOwner() : boolean{
    return this.loginUser.id === this.user.id;
  }

  public deleteComment(){
    if(confirm("Willst du dieses Kommentar wirklich löschen?"))
    this.cs.deleteComment(this.comment.id)
      .then(response => new Notification("Erfolgreich gelöscht!"))
      .then(response => this.deleteEvent.emit())
      .catch(error => console.log('error', error))
  }
}
