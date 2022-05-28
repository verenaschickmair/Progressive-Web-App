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

  @Input() comment! : Comment;
  @Output() deleteEvent = new EventEmitter();
  private loginUserId? = 0;


  constructor(private us : UserService,
              private authService : AuthenticationService,
              private cs : CommentService,
              private router : Router) { }

  ngOnInit(): void {
    this.us.getLoggedInUserId().then((userId) => this.loginUserId = userId);
    // this.us.getSingle(this.comment.user_id).subscribe((u) => this.user = u);
  }

  isCurrentUserOwner() : boolean{
    return this.loginUserId === this.comment.acf.user;
  }

  public deleteComment(){
    if(confirm("Willst du dieses Kommentar wirklich löschen?"))
    this.cs.deleteComment(this.comment.id)
      .then(response => new Notification("Erfolgreich gelöscht!"))
      .then(response => this.deleteEvent.emit())
      .catch(error => console.log('error', error))
  }
}
