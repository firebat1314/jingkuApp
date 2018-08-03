import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the ChooseLensLPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'choose-lens-l/:order_id'
})
@Component({
   selector: 'page-choose-lens-l',
   templateUrl: 'choose-lens-l.html',
})
export class ChooseLensLPage {
   rec_id: any = this.navParams.get('rec_id');
   rec_ids: any = this.navParams.get('rec_ids');
   data: any;
   order_id = this.navParams.get('order_id');
   pian_rec: any = this.navParams.get('pian_rec');

   scannerData: any = this.navParams.get('scannerData');
   constructor(
      public navCtrl: NavController,
      public httpService: HttpService,
      public navParams: NavParams,
      public viewCtrl: ViewController,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ChooseLensLPage');
   }

   ngOnInit() {
      if (!this.scannerData) {
         this.httpService.machining_goods({ order_id: this.order_id, type: 'zuo', goods_type: 'pian', rec_ids: this.rec_ids, rec_id: this.rec_id, pian_rec: this.pian_rec }).then((res) => {
            if (res.status == 1) {
               this.data = res
            } else {
               this.viewCtrl.dismiss();
            }
         })
      }
   }

   submit() {
      if (this.rec_id) {
         this.httpService.select_goods_type({ goods_rec: this.rec_id, type: '1', str_type: 'zuo' }).then((res) => {
            if (res.status) {
               this.viewCtrl.dismiss(res.data, 'submit');
            }
         })
      } else {
         this.viewCtrl.dismiss(null, 'submit');
      }
   }
}
