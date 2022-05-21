import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {
  public requestList: Array<Map<any, any>> = [];
  public currentPage = 2;
  public isLoggedIn = window.localStorage.getItem('token');

  constructor() {
  }

  ngOnInit(): void {

    // /* PAGINATION */
    // https://api.s1910456028.student.kwmhgb.at/wp-json/wp/v2/posts?per_page=3
    fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/acf/v3/sb_request?per_page=4")
      .then((response) => {
        // this.paginate(response.headers.get("X-WP-TotalPages"));
        return response;
      }).then(response => response.json())
      .then(offers => {
        this.renderPosts(offers);
      });
  }

  // public paginate(totalPages: string|null) {
  //   if (totalPages && parseInt(totalPages) > 1)
  //     this.totalPages = parseInt(totalPages);
  // }

  public renderPagination() {
    fetch("https://api.s1910456028.student.kwmhgb.at/wp-json/acf/v3/sb_request?per_page=4&page=" + this.currentPage)
      .then(response => response.json())
      .then(posts => {
        this.renderPosts(posts);
        this.currentPage++;
      });
  }

  private renderPosts(requests: any) {
    for (let request of requests) {
      let requestMap: Map<any, any> = new Map();
      for (const [key, value] of Object.entries(request.acf)) {
        requestMap.set(key, value);
      }
      requestMap.set("image", RequestListComponent.generateUserImage(requestMap.get("user").user_avatar));
      this.requestList.push(requestMap);
    }
  }

  private static generateUserImage(image:string) : string {
    const div = document.createElement('div')
    div.innerHTML = image
    const img = div.querySelector('img')
    return img!.src;
  }
}
