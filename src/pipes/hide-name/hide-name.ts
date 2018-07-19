import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the HideNamePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
   name: 'hideName',
})
export class HideNamePipe implements PipeTransform {
   /**
    * Takes a value and makes it lowercase.
    */
   transform(value: string, ...args) {
      let out = value[0] + '*****' + value[value.length - 1];
      return out;
   }
}
