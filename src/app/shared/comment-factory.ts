import { Injectable } from '@angular/core';
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentFactoryService {

  constructor() { }

  static empty() : Comment {
    return new Comment([], '', 'publish', {text: '', user: 0, offer: []});
  }

  static fromObject (rawComment: any) : Comment {
    return new Comment(
      [],
      rawComment.title,
      rawComment.status,
      {
        text: rawComment.text,
        user: rawComment.user,
        offer: [rawComment.offer]
      }
    );
  }
}
