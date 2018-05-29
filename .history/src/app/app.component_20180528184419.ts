import { Component } from '@angular/core';
import { UserInfoService } from './user-info.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserInfoService) {
    this.loadUser();
  }
  pager: any = {};
  pagedItems: any[];
  private allItems: any[];
  totalrecord: any;
  loadUser() {
    this.userService.getUser().subscribe(data =>
       {
         // set items to json response
        this.allItems = data;
        this.totalrecord =this.allItems.length;
        // initialize to page 1
        this.setPage(1);
       }
      );
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.userService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}
}
