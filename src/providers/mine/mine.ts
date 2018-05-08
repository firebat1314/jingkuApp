import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../http-service';
import { Native } from '../native';

/*
  Generated class for the MineProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class MineProvider {
  canCheckout: boolean;
  public showPrice: boolean;
  public userInfo: any;
  public subject: Subject<any> = new Subject<any>();

  constructor(
    private httpServ: HttpService,
    private native: Native,
  ) {
    console.log('Hello MineProvider Provider');
  }
  public get currentUser(): Observable<any> {
    return this.subject.asObservable();
  }
  getUser() {
    if (!this.userInfo) {
      this.httpServ.userInfo().then((res) => {
        if (res.status) {
          this.userInfo = res;
          // setInterval(()=>{
          // var index = this.userInfo.data.authority.indexOf('1')
          // index > -1?this.userInfo.data.authority.splice(index,1):this.userInfo.data.authority.push('1')
          this.subject.next(this.userInfo);
          // this.showPrice = !this.showPrice;
          // },3000)
          this.httpServ.setByName('userInfo', res);
          this.showPrice = res.data.authority.indexOf('1') > -1;
          this.canCheckout = res.data.authority.indexOf('2') > -1;
        }
      })
    } else {
      this.subject.next(this.userInfo);
    }
  }
  unsubscribe() {
    // this.subject.unsubscribe()
  }
  changeUser() {
    this.httpServ.userInfo().then((res) => {
      if (res.status) {
        this.userInfo = res;
        this.httpServ.setByName('userInfo', res);
        this.showPrice = res.data.authority.indexOf('1') > -1;
        this.subject.next(res);
      }
    })
  }
}
