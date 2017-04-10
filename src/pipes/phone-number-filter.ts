import { Injectable, Pipe } from '@angular/core';

/*
  Generated class for the PhoneNumberFilter pipe.

  See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
  Angular 2 Pipes.
*/
@Pipe({
  name: 'phonenumberfilter'
})
@Injectable()
export class PhoneNumberFilter {
  /*
    Takes a value and makes it lowercase.
   */
  transform(value, args) {
    if(value){
      value = value.substring(0,3)+"****"+value.substring(9,11);  
      value.toLowerCase();
    }
    return value
  }
}
