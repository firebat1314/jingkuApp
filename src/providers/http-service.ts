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
  getHomebanner(data?:Object) {//轮播图
    return this.http.get(this.ip + '/Index/ads/int_pos_id/3/int_size/10', data)
  }
  getCategoryAd(data?:Object){//2、热门品类下的广告
    return this.http.get(this.ip + '/Index/ads/int_pos_id/27/int_size/10', data)
  }
  getHandpickDetails(data?:Object){//（1）4、精选专题下热门商品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/hot', data)
  }
  getGoodsGallery(data?:Object){//5、商品详情页
      return this.http.get(this.ip + '/Goods/get_goods_gallery', data)
  }
  getCategoryRecommendGoods(data?:Object){//（3）新品
      return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/new', data)
  }
  getCategoryRecommendGoodsBest(data?:Object){//（2）精品商品
      return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/best', data)
  }
   getCategoryRecommendGoodsHot(data?:Object){//4、精选专题下的商品列表
      return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/hot', data)
  }
   getBrands(data?:Object){//3、热门品牌下的品牌列表
      return this.http.get(this.ip + '/Index/get_brands', data)
  }
}
