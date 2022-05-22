import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable, retry} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfferService {

  api = "https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer";

  constructor(private http : HttpClient) { }

  getSingle(id: string): Observable<any> {
    return this.http.get<any>(`${this.api}/${id}`);
  }

  deleteOffer(id: string) {
    // let myHeaders = new Headers();
    // myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    //
    // // @ts-ignore
    // return this.http.delete<any>(`${this.api}/${id}`,myHeaders);

    let myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + window.localStorage.getItem('token'));
    let options = {
      method: 'DELETE',
      headers: myHeaders,
      redirect: 'follow'
    };
    // @ts-ignore
    return fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer/${id}`, options)
      .catch(error => console.log('error', error));
  }
}
