import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Comment} from "./comment";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  comments = new BehaviorSubject<any>([]);
  constructor() { }

  getAll(){
    let options = {
      method: 'GET',
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_comment`, options)
      .then(response => response.json()
      .then((comments) => {
        this.comments.next(comments)
        return this.comments.getValue();
      }))
      .catch(error => console.log('error', error));
  }

  createComment(comment : Comment) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    myHeaders.append("Content-Type", "application/json");
    let options = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(comment),
      redirect: 'follow',
    };
    // @ts-ignore
    return fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_comment`, options)
      .catch(error => console.log('error', error));
  }

  deleteComment(id: number) {
    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    let options = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_comment/${id}`, options)
      .catch(error => console.log('error', error));
  }
}
