import { Component } from '@angular/core';
import { IonicPage, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the FrameInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-frame-info',
   templateUrl: 'frame-info.html',
})
export class FrameInfoPage {
   goods_id: any = this.navParams.get('goods_id');
   data: any;

   constructor(
      private httpServ: HttpService,
      private navParams: NavParams
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad FrameInfoPage');
   }

   ngOnInit() {
      this.httpServ.get_goods_parameter({ goods_id: this.goods_id }).then(res => {
         this.data = res;
      })
   }
}
