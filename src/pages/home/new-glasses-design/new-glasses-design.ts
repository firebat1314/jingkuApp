import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,Content } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';

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
    private mine: MineProvider,
  ) {
  }
  ngOnInit(){
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
  next(mycontent,goodsssssss) {
    this.httpService.categoryGoods({ cat_id: 421, page: ++this.goodsList.page }).then((res) => {
      if (res.status == 1) {
        this.goodsList = res;
        mycontent.scrollTo(0,goodsssssss.offsetTop)
      }
    })
  }
  preview(mycontent,goodsssssss) {
    this.httpService.categoryGoods({ cat_id: 421, page: --this.goodsList.page }).then((res) => {
      if (res.status == 1) {
        this.goodsList = res;
        mycontent.scrollTo(0,goodsssssss.offsetTop)
      }
    })
  }
}
