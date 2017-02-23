import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData } from "../services/user-data";

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  private ip = 'http://v401app.jingkoo.net';  // URL to web API
  constructor(public http: UserData) {
    console.log('Hello HttpService Provider');
  }
  getHomebanner(data?:Object) {
    return this.http.get(this.ip + '/Index/ads/int_pos_id/3/int_size/10', data)
  }
  getCategoryAd(data?:Object){
    return this.http.get(this.ip + '/Index/ads/int_pos_id/27/int_size/10', data)
  }
  getHandpickDetails(data?:Object){
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/hot', data)
  }

  
}
