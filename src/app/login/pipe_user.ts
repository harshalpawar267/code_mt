import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the UserPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'userPipe',
  pure: false
})
export class UserPipe implements PipeTransform {

   /*********************************
   * created by: Bhagyashri Nikam.
   * used to filtering users for team and admin
   ************************************/

  transform(value: any, args: any, args1: any) {
    if (!value) return [];
    if(args1 != 'Team'){
      if (value != "" && value != undefined && args != undefined && args1 != "" && args1 != undefined) {

        return value.filter(row => {
          if (args1 != row.user_type) {
            return false;
          }
  
          if (args == false && (row.flag == false || row.flag == undefined)) {
            return true;
          }
          return false;
        })
      }
    }else{
      return value.filter(row => {
        if (args1 != row.user_type) {
          return false;
        }
        return true;
      })
    }
    

  }
      
}
