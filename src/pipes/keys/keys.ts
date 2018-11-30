import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the KeysPipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
   name: 'keys',
   pure: false
})
export class KeysPipe implements PipeTransform {
   /**
    * Takes a value and makes it lowercase.
    */
   transform(value, ...args: string[]): any {
      if (value.length != undefined) {
         return value;
      }
      let keys = [];
      for (let key in value) {
         keys.push(value[key]);
      }
      return keys;
   }
}
