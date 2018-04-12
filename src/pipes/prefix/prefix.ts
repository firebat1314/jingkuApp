import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the PrefixPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'prefix',
})
export class PrefixPipe implements PipeTransform {
  /**
   * Takes a value and makes it lowercase.
   */
  transform(value: string, ...args) {
    return (value[0] == '￥' || value[0] == '¥') ? value : '¥' + value;
  }
}
