import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { AccountProcessProvider } from '../account-process-provider';

/**
 * Generated class for the ChooseLensLPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'choose-lens/:order_id'
})
@Component({
   selector: 'page-choose-lens',
   templateUrl: 'choose-lens.html',
})
export class ChooseLensPage {
   rec_id: any = this.navParams.get('rec_id');
   rec_ids: any = this.navParams.get('rec_ids');
   data: any;
   order_id = this.navParams.get('order_id');
   pian_rec: any = this.navParams.get('pian_rec');

   scannerData: any = this.navParams.get('scannerData');
   scannerIndex: any = this.navParams.get('scannerIndex');//扫码加工单下标
   constructor(
      private navCtrl: NavController,
      private httpService: HttpService,
      private navParams: NavParams,
      private viewCtrl: ViewController,
      private thisProvider: AccountProcessProvider,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ChooseLensLPage');
   }

   ngOnInit() {
   
   }

   openScanner() {
      this.thisProvider.openScanner(this.scannerIndex, 1).then(data => {//扫码并加入加工单完成返回的商品信息
         this.scannerData = data.attr.left_attr;
      }).catch(() => { })
   }

   submit() {
      if (this.rec_id && !this.scannerData) {
         this.httpService.select_goods_type({
            goods_rec: this.rec_id,
            type: '1',
            str_type: 'zuo'
         }).then((res) => {
            if (res.status) {
               this.viewCtrl.dismiss(res.data, 'submit');
            }
         })
      } else {
         this.viewCtrl.dismiss(this.scannerData, 'submit');
      }
   }
}
