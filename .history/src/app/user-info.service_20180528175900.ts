import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class UserInfoService {

  constructor(
    private http: Http
  ) {

  }


  getUser() {
    return this.http.get(`https://api.github.com/users`)
      .map((res: Response) => res.json());
  }

}
