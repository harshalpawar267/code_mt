import { Component } from '@angular/core';
import { UserInfoService } from './user-info.service';
import { getTypeNameForDebugging } from '@angular/core/src/change_detection/differs/iterable_differs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  constructor(private userService: UserInfoService) {
  }
  pager: any = {};
  pagedItems: any[];
  totalrecord: any;
  private allItems: any[];
  details : boolean= false;
  hidden_id:any;
  sortBy = [
    {value: 'nameace', viewValue: 'Name Accending order'},
    {value: 'namedec', viewValue: 'Name Decending order'},
    {value: 'rankace', viewValue: 'Rank Accending order'},
    {value: 'rankdce', viewValue: 'Rank Decending order'},
  ];


  setPage(page: number) {
    // get pager object from service
    this.pager = this.userService.getPager(this.allItems.length, page);

    // get current page of items
    this.pagedItems = this.allItems.slice(this.pager.startIndex, this.pager.endIndex + 1);
}

  user_info(value){
    this.userService.getUser(value).subscribe(data =>
      {
        // set items to json response
       this.allItems = data.items;
       this.totalrecord =this.allItems.length;
       // initialize to page 1
       this.setPage(1);
      }
     );
  }

  infomation:boolean = false;
  cust_details(flag,namem,id){
    if(flag == "true" ){
      this.details = true;
      this.infomation = true;
      this.userService.get_details_User(name).subscribe(data =>
        {
          this.hidden_id = id;

         // initialize to page 1
         this.setPage(1);
        }
       );
    } else {
      this.infomation = false;
      this.details = false;
    }
  }

}
