import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-offer-list',
  templateUrl: './offer-list.component.html',
  styleUrls: ['./offer-list.component.css']
})
export class OfferListComponent implements OnInit {
  public offerList: Array<Map<any, any>> = [];
  public totalPages = 1;
  public currentPage = 1;
  public openTab = false;
  public openOrderTab = false;
  public filter = new Map();
  public filterString? : string;
  public sortName = "Datum";
  public categoryName = "Alle";
  public isLoggedIn = window.localStorage.getItem('token');

  constructor() {
  }

  ngOnInit(): void {
    this.getInitState();
  }

  public getInitState(mode? : string, value?: string){
    // /* PAGINATION */
    this.openTab = false;
    this.openOrderTab = false;

    if(mode && value) {
      this.offerList = [];
      this.filter.set(mode, value);
      this.generateFilterString();
        fetch(`https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/sb_offer?per_page=4&${this.filterString}`)
        .then((response) => {
          this.paginate(response.headers.get("X-WP-TotalPages"));
          return response;
        }).then(response => response.json())
        .then(offers => {
          this.renderPosts(offers);
        });
    } else{
      this.offerList = [];
      this.currentPage = 1;
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
      let offerMap: Map<any, any> = new Map();
      for (const [key, value] of Object.entries(offer.acf)) {
        offerMap.set(key, value);
      }
      offerMap.set("image", OfferListComponent.generateUserImage(offerMap.get("user").user_avatar));
      this.offerList.push(offerMap);
    }
  }

  private static generateUserImage(image: string): string {
    const div = document.createElement('div')
    div.innerHTML = image
    const img = div.querySelector('img')
    return img!.src;
  }

  public toggle(order? : string){
    if(order)
      return this.openOrderTab = !this.openOrderTab;
    else
      return this.openTab = !this.openTab;
  }


}
