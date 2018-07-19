import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, InfiniteScroll } from 'ionic-angular';
import { Native } from '../../../../providers/native';
import { HttpService } from '../../../../providers/http-service';
import { GalleryModal } from 'ionic-gallery-modal';

/**
 * Generated class for the CommentListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
   segment: 'comment-list/:goods_id'
})
@Component({
   selector: 'page-comment-list',
   templateUrl: 'comment-list.html',
})
export class CommentListPage {
   commentType: number = 0;
   goodsId: any = this.navParams.get('goods_id');
   commentData: any;
   commentList: any;
   infiniteScroll: InfiniteScroll;

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private native: Native,
      private http: HttpService,
      public modalCtrl: ModalController,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad CommentListPage');
   }
   ngOnInit() {
      this.getCommentData();
   }
   /* 获取评价 */
   getCommentData(commentType = 0, comment_type = 0) {
      this.commentType = commentType;
      return this.http.commentIndex({
         type: this.commentType,
         comment_type: comment_type,
         goods_id: this.goodsId,
         page: 1
      }).then(res => {
         if (res.status == 1) {
            this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
            this.commentData = res;
            this.commentList = res.list;
         }
      })
   }
   doRefresh(refresher) {
      this.getCommentData().then(()=>{
         setTimeout(() => {
            refresher.complete();
         }, 500);
      })
   }
   doInfinite(infiniteScroll) {
      this.infiniteScroll = infiniteScroll;
      let p = this.commentData.page;
      if (this.commentData.page < this.commentData.pages) {
         let p = this.commentData.page;
         let pagingParam = Object.assign({
            type: this.commentType,
            comment_type: 0,
            goods_id: this.goodsId,
            page: 1
         }, { page: ++p });
         this.http.commentIndex(pagingParam, { showLoading: false }).then((res) => {
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
   /* 评论点赞 */
   commentCommentLaud(item) {
      if (!item.is_laud) {
         this.http.commentCommentLaud({
            id: item.comment_id
         }).then((res) => {
            if (res.status == 1) {
               item.is_laud = true;
               item.laud_count++;
            }
         })
      } else {
         this.native.showToast('已经赞过啦');
      }
   }
   viewImages(data, index) {
      var arr = new Array();
      if (data.length) {
         data.forEach(element => {
            arr.push({ url: element });
         });
      }
      this.modalCtrl.create(GalleryModal, {
         photos: arr,
         initialSlide: index,
      }).present();
   }
}
