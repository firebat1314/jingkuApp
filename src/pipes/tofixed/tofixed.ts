import { Pipe, PipeTransform } from '@angular/core';

/**
 * Generated class for the TofixedPipe pipe.
 *
 * See https://angular.io/docs/ts/latest/guide/pipes.html for more info on
 * Angular Pipes.
 */
@Pipe({
  name: 'tofixed',
})
export class TofixedPipe implements PipeTransform {
  transform(value: string, ...args) {
    if(value[0]=='¥'){
      value = value.slice(1);
    }
    var val = Math.round(parseFloat(value) * 100) / 100;
		var xsd = val.toString().split(".");
		if (xsd.length == 1) {
			value = Number(val.toString() + ".00").toFixed(2);
		}
		if (xsd.length > 1) {
			if (xsd[1].length < 2) {
				value = Number(val.toString() + "0").toFixed(2);
			}
		}
		return value;
  }
}
