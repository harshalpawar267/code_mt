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
  profile = {};
  
  loadUser() {
    this.userService.getUser().subscribe(data => this.profile = data);
  }
}
