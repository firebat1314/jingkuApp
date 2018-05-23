import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the FindTelePipe pipe.
 *
 * See https://angular.io/api/core/Pipe for more info on Angular Pipes.
 */
@Pipe({
  name: 'findTele',
})
export class FindTelePipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    let phoneRex = /(1[3-8]\d{9})(?!@|.*?\1)/gi;
    let result = value.replace(phoneRex, '<a href="tel:$&" style="color:#3d7cca">$&</a>') 
    return result;
  }
}
