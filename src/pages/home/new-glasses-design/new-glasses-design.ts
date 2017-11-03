import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the NewGlassesDesignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-glasses-design',
  templateUrl: 'new-glasses-design.html',
})
export class NewGlassesDesignPage {
  goodsList: any;
  banner = [{
    ad_img: './assets/images/sheji.jpg',
  }]
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {
    this.getGoodsList();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewGlassesDesignPage');
  }

  getGoodsList() {
    this.httpService.categoryGoods({ cat_id: 421, page: 1 }).then((res) => {
      if (res.status == 1) {
        this.goodsList = res;
      }
    })
  }
  next() {
    console.log(this.goodsList.page)
    this.httpService.categoryGoods({ cat_id: 421, page: ++this.goodsList.page }).then((res) => {
      if (res.status == 1) {
        this.goodsList = res;
      }
    })
  }
  preview() {
    this.httpService.categoryGoods({ cat_id: 421, page: --this.goodsList.page }).then((res) => {
      if (res.status == 1) {
        this.goodsList = res;
      }
    })
  }
}
