import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ParticularsPage } from "../../home/particulars/particulars";

/*
  Generated class for the MoreBrand page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-more-brand',
  templateUrl: 'more-brand.html'
})
export class MoreBrandPage {
  data = this.navParams.get('data');
  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MoreBrandPage');
  }
  clickBanner(item) {
    if (item.link_type.type_name == 'category') {
      this.navCtrl.parent.select(1);
      /*this.navCtrl.push(ClassifyPage, {
        categoryId: item.link_type.type_value
      })*/
    } else if (item.link_type.type_name == 'goods') {
      this.navCtrl.push(ParticularsPage, {
        goodsId: item.link_type.type_value
      })
    } else if (item.link_type.type_name == "brand") {
      this.navCtrl.parent.select(1);
      /*this.navCtrl.push(ClassifyPage, {
        brandId: item.link_type.type_value
      })*/
    }
  }
}
