import { Injectable } from '@angular/core';
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentFactoryService {

  constructor() { }

  static empty() : Comment {
    return new Comment(0,{text: '', user: 0, offer: 0});
  }

  static fromObject (rawComment: any) : Comment {
    return new Comment(
      rawComment.id,
      {
        text: rawComment.acf.text,
        user: rawComment.acf.user,
        offer: rawComment.acf.offer
      }
    );
  }
}
