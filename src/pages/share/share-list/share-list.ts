import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';

/**
 * Generated class for the ShareListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-share-list',
   templateUrl: 'share-list.html',
})
export class ShareListPage {
   data1: any;
   data2: any;
   selectorbar = 0;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public httpServ: HttpService,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad ShareListPage');
   }

   ngOnInit() {
      this.httpServ.ShareList({ type: 0 }).then(res => {
         this.data1 = res;
      })
      this.httpServ.ShareList({ type: 1 }).then(res => {
         this.data2 = res;
      })
   }
}
