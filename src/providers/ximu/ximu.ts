import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Native } from '../native';

declare var cordova: any;
/*
  Generated class for the XimuProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class XimuProvider {

  constructor(public native: Native) {
    console.log('Hello XimuProvider Provider');
  }

  openXimu(url) {
    cordova.exec(
      (result) => {
        if (result != null) {
          this.native.showToast(result, null, true);
        }
      },
      (msg) => {
        this.native.showToast(msg, null, true);
      },
      "CallActivityPlugin",
      "call", [url])
  }
}
