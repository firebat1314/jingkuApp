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

  openXimu(url, successCallback?) {
    if (typeof cordova != "undefined") {
      cordova.exec(
        (response) => {
          if (typeof response !== 'object') { response = JSON.parse(response); }
          successCallback ? successCallback(response) : null;
        },
        (msg) => {
          this.native.showToast(msg, null, true);
        },
        "CallActivityPlugin",
        "call", [url])
    } else {
      this.native.showToast('请在安卓客户端操作')
    }
  }
}
