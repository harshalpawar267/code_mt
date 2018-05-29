import { Pipe, PipeTransform } from "@angular/core";
@Pipe( {
name: 'orderBy'
} )

export class OrderByPipe implements PipeTransform {
    
transform( array: Array<any>, orderField: string, orderType: boolean ): Array<string> {
    if(orderField == "nameace"|| orderField == "namedec"){
        var data = "login";
        orderType = true;
    } else if(orderField == "rankace"|| orderField == "rankdce"){
        var data = "id";
        orderType = true;
    } 
    array.sort( ( a: any, b: any ) => {
        
        
        let ae = a[ data ];
        let be = b[ data ];
        if ( ae == undefined && be == undefined ) return 0;
        if ( ae == undefined && be != undefined ) return orderType ? 1 : -1;
        if ( ae != undefined && be == undefined ) return orderType ? -1 : 1;
        if ( ae == be ) return 0;
        return orderType ? (ae.toString().toLowerCase() > be.toString().toLowerCase() ? -1 : 1) : (be.toString().toLowerCase() > ae.toString().toLowerCase() ? -1 : 1);
    } );
    console.log(array);
    return array;
  }
}