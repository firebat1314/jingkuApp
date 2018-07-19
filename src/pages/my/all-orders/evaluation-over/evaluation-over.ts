import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { Native } from '../../../../providers/native';

/**
 * Generated class for the EvaluationOverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'evaluation-over/:suppliers_id'
})
@Component({
   selector: 'page-evaluation-over',
   templateUrl: 'evaluation-over.html',
})
export class EvaluationOverPage {
   reckon: any;

   suppliers_id = this.navParams.get('suppliers_id') || 38;
   commentList: any;
   commentData: any;
   suppliers_info: any;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpServ: HttpService,
      private native: Native,
   ) {

   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad EvaluationOverPage');
   }
   complete() {
      return this.navCtrl.pop().catch(res => { 
         this.navCtrl.parent.select(3);
       });
   }
   ngOnInit() {
      this.httpServ.getSupplierInfo({ suppliers_id: this.suppliers_id }).then(res => {
         if (res.status == 1) {
            this.suppliers_info = res;
            this.httpServ.commentCommentReckon({ suppliers_id: this.suppliers_id }).then(res => {
               if (res.status == 1) {
                  this.reckon = res;
               }
            })
         }
      })
      this.httpServ.commentNoComment({ page: 1, size: 5 }, { showLoading: false }).then(res => {
         if (res.status == 1) {
            this.commentData = res;
            this.commentList = res.list;
         }
      })
   }

   collectStore() {
      this.httpServ.CollectShop({ id: this.suppliers_id, type: this.suppliers_info.data.is_select == 1 ? 0 : 1 }).then((res) => {
         this.native.showToast(res.info);
         this.suppliers_info.data.is_select = this.suppliers_info.data.is_select == 1 ? 0 : 1;
      })
   }
}
