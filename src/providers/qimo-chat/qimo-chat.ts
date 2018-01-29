import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Native } from '../native';

declare let qimoChatClick;
/*
  Generated class for the QimoChatProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class QimoChatProvider {

  constructor(
    public native: Native
  ) {
    console.log('Hello QimoChatProvider Provider');
  }
  qimoChatClick(options?:{
    access_id?:string,
  }) {
    /* let _options = Object.assign({
      access_id:'b441f710-80d9-11e7-8ddd-b18e4f0e2471'
    },options) */
    
    this.native.showLoading();
    var old = document.getElementsByClassName('qimo')[0]
    //console.log(old);
    if (old) {
      old.parentNode.removeChild(old);
    }
    let qimo: HTMLScriptElement = document.createElement('script');
    qimo.type = 'text/javascript';
    qimo.src = 'https://webchat.7moor.com/javascripts/7moorInit.js?accessId=' + (options.access_id||'b441f710-80d9-11e7-8ddd-b18e4f0e2471') + '&autoShow=false';
    console.log(qimo.src)
    qimo.className = 'qimo';
    document.getElementsByTagName('body')[0].appendChild(qimo);
    let that = this;
    qimo.onload = qimo['onreadystatechange'] = function () {
      that.native.hideLoading();
      if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
        setTimeout(function () {
          qimoChatClick();
        }, 1000);
        qimo.onload = qimo['onreadystatechange'] = null;
      }
    };
    /* var timer = setInterval(() => {
      if (qimoChatClick) {
        that.native.hideLoading();
        clearInterval(timer)
        setTimeout(() => {
          qimoChatClick();
        }, 500);
      }
    }, 100) */
  }
}
