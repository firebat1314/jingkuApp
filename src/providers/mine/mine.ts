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
  public subject: Subject<any> = new Subject<any>();

  constructor(
    public httpServ: HttpService,
    public native: Native,
  ) {
    console.log('Hello MineProvider Provider');
  }
  public get currentUser(): Observable<any> {
    return this.subject.asObservable();
  }

  getUser() {
    this.httpServ.userInfo().then((res) => {
      if (res.status) {
        this.subject.next(res);
      }
    })
  }
}
