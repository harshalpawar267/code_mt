import { Pipe, PipeTransform } from "@angular/core";
@Pipe( {
name: 'orderBy'
} )

export class OrderByPipe implements PipeTransform {
    
transform( array: Array<any>, orderField: string, orderType: boolean ): Array<string> {
    
    array.sort((a: any, b: any) => {
        if (a < b) {
          return -1;
        } else if (a > b) {
          return 1;
        } else {
          return 0;
        }
      });
      return array;
    }

}