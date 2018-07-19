import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, InfiniteScroll, Events } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the EvaluationListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-evaluation-list',
   templateUrl: 'evaluation-list.html',
})
export class EvaluationListPage {
   commentData: any;
   commentList: any[];
   infiniteScroll: InfiniteScroll;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpServ: HttpService,
      private events: Events,
   ) {
      this.events.subscribe('EvaluationListPage:update', () => {
         this.httpServ.commentNoComment({ page: 1, size: 10 }).then(res => {
            if (res.status == 1) {
               this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
               this.commentData = res;
               this.commentList = res.list;
            }
         })
      })
   }
   ngOnDestroy() {
      this.events.unsubscribe('EvaluationListPage:update');
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad EvaluationListPage');
   }

   ngOnInit() {
      this.httpServ.commentNoComment({ page: 1, size: 10 }).then(res => {
         if (res.status == 1) {
            this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
            this.commentData = res;
            this.commentList = res.list;
         }
      })
   }
   doRefresh(refresher) {
      this.httpServ.commentNoComment({ page: 1, size: 10 }, { showLoading: false }).then(res => {
         if (res.status == 1) {
            this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
            this.commentData = res;
            this.commentList = res.list;
         }
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      let p = this.commentData.page;
      if (this.commentData.page < this.commentData.pages) {
         this.httpServ.commentNoComment({ page: ++p, size: 10 }, { showLoading: false }).then((res) => {
            if (res.status == 1) {
               this.commentData = res;
               this.commentList = [...this.commentList, ...res.list];
            }
            setTimeout(() => {
               infiniteScroll.complete();
            }, 500);
         })
      } else {
         infiniteScroll.enable(false);
      }
   }
}
