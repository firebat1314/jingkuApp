import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the DiscountCoupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-discount-coupon',
  templateUrl: 'discount-coupon.html'
})
export class DiscountCouponPage {
  data: any;
  @ViewChild('myCanvas') myCanvas:ElementRef
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountCouponPage');
    this.getCouponData();
  }
  ngAfterViewInit(){
    console.log(this.myCanvas.nativeElement)
  }

  getCouponData() {
    this.httpService.coupon().then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
}
