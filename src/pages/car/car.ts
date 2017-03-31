import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { Native } from "../../providers/native";
import { HttpService } from "../../providers/http-service";
import { HomePage } from "../home/home";

/*
  Generated class for the Car page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-car',
  templateUrl: 'car.html'
})
export class CarPage {
  HomePage: any = HomePage
  isEdit: boolean = false;
  carDetails: any;
  inputLock: boolean = false;

  checkedArray: Array<number> = [];
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public native: Native,
    public alertCtrl: AlertController,
    public httpService: HttpService,
    public event: Events
  ) {
    this.getFlowGoods();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad CarPage');
  }
  getFlowGoods(finished?) {
    this.httpService.getFlowGoods().then((res) => {
      console.log(res)
      if(finished){finished();}
      if (res.status == 1) {this.carDetails = res;}
      // this.carDetails.selected = true;
      // this.calculateTotal();
    })
  }
  /*下拉刷新*/
  doRefresh(refresher) {
    this.getFlowGoods(function(){
      setTimeout(() => {
        refresher.complete();
      }, 500);
    })
  }
  deleteItem(item3) {
    let confirm = this.alertCtrl.create({
      cssClass: 'alert-style',
      subTitle: '确认删除该商品吗？',
      buttons: [
        {
          text: '取消',
          handler: () => {
            console.log('Disagree clicked');
          }
        },
        {
          text: '确认',
          handler: () => {
            console.log('Agree clicked');
            this.httpService.dropCartGoods({ rec_id: item3.rec_id }).then((res) => {
              if (res.status == 1) {
                this.getFlowGoods();
              }
            })
          }
        }
      ],
    });
    confirm.present();
  }
  checkGoods(item) {
    let index = this.checkedArray.indexOf(item.goods_id);
    if (index == -1) {
      this.checkedArray.push(item.goods_id);
    } else {
      this.checkedArray.splice(index, 1);
    }
    console.log(this.checkedArray);
  }
  numberChangeI(event, item) {
    item.goods_number = event;
    this.httpService.changeNumCart({ rec_id: item.rec_id, number: event }).then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.inputLock = false;
        this.getFlowGoods();
      } else {
        item.goods_number = item.goods_number - 1;
        this.inputLock = true;
      }
    });
    // this.calculateTotal();
  }
  /*——————————————————————————————————————————————————————————————————*/
  /*  calculateTotal() {//购物车总价格
      let total = 0;
      let number = 0;
      for (let i = 0, item = this.carDetails.suppliers_goods_list; i < item.length; i++) {
        this.calculateShopPrice(item[i]);
        total += item[i].subtotal;
        number += item[i].number;
      }
      this.carDetails.total.goods_amount = total;
      this.carDetails.total.real_goods_count = number;
      this.event.publish('user:carNumber', number);
    }
    calculateShopPrice(items) {//购物车小计
      let subtotal = 0;
      let number = 0;
      for (let i = 0, item = items.goods_list; i < item.length; i++) {//单个店铺的所有商品
        for (let j = 0; j < item[i].attrs.length; j++) {//单个商品的所有属性
          subtotal += Number(item[i].attrs[j].goods_number) * Number(item[i].attrs[j].goods_price.substr(1));
          number += Number(item[i].attrs[j].goods_number)
        }
      }
      items.goods_price_total = subtotal;
      items.goods_count = number;
    }*/
}
