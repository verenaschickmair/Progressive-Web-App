import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user.service";

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  offerList: Array<Map<any, any>> = [];
  totalPages = 1;
  currentPage = 1;
  openCategotyTab = false;
  openOrderTab = false;
  filter = new Map();
  filterString? : string;
  sortName = "Datum";
  categoryName = "Alle";
  isLoggedIn = window.localStorage.getItem('token');
  loginUser? : any;
  loaded = false;

  constructor(private us : UserService) {
  }

  ngOnInit(): void {
    console.clear();
    this.getInitState();
  }

  getInitState(mode? : string, value?: string){
    // /* PAGINATION */
    this.openCategotyTab = false;
    this.openOrderTab = false;
    this.totalPages = 1;
    this.currentPage = 1;

    if(mode && value) {
      console.countReset("Offers");
      this.offerList = [];
      this.filter.set(mode, value)
      this.updateFilterName(mode, value);
      this.generateFilterString();
      fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer?per_page=4&${this.filterString}`)
      .then((response) => {
        this.paginate(response.headers.get("X-WP-TotalPages"));
        return response;
      }).then(response => response.json())
      .then(offers => {
        this.renderPosts(offers);
      });
    }
    else{
      this.offerList = [];
      this.filter.delete("categories");
      this.generateFilterString();
      fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer?per_page=4`)
        .then((response) => {
          this.paginate(response.headers.get("X-WP-TotalPages"));
          return response;
        }).then(response => response.json())
        .then(offers => {
          this.renderPosts(offers);
        });
    }
  }

  private updateFilterName(mode:string, value:string){
    if(mode === "categories"){
      switch (value) {
        case "5":
          this.categoryName = "Deutsch";
          break;
        case "6":
          this.categoryName = "Englisch";
          break;
        case "7":
          this.categoryName = "Mathematik";
          break;
        case "8":
          this.categoryName = "Informatik";
          break;
        case "9":
          this.categoryName = "Biologie";
          break;
    }
  }
    else {
      switch (value) {
        case "date":
          this.sortName = "Datum";
          break;
        case "author":
          this.sortName = "Ersteller:in";
          break;
      }
    }
  }

  public generateFilterString(){
    let filterString = "";
    for (const [key, value] of this.filter.entries()) {
      filterString += `${key}=${value}&`;
    }
    this.filterString = filterString;
  }

  public paginate(totalPages: string|null) {
    if (totalPages && parseInt(totalPages) > 1)
      this.totalPages = parseInt(totalPages);
  }

  public renderPagination() {
    this.currentPage++;
    if(this.filterString){
      fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer?${this.filterString}per_page=4&page=${this.currentPage}`)
      .then(response => response.json())
      .then(posts => {
        this.renderPosts(posts);
      });}
    else{
      fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer?per_page=4&page=${this.currentPage}`)
        .then(response => response.json())
        .then(posts => {
          this.renderPosts(posts);
        });}
    }

  private renderPosts(offers: any) {
    for (let offer of offers) {
      console.count("Offers");
      let offerMap: Map<any, any> = new Map();
      offerMap.set('id', offer.id);
      offerMap.set('date', offer.date);
      for (const [key, value] of Object.entries(offer.acf)) {
        offerMap.set(key, value);
      }
      this.offerList.push(offerMap);
    }
    this.loaded = true;
  }

  public toggle(order? : string){
    if(order){
      this.openCategotyTab = false;
      return this.openOrderTab = !this.openOrderTab;
    }
    else{
      this.openOrderTab = false;
      return this.openCategotyTab = !this.openCategotyTab;
    }
  }
}
