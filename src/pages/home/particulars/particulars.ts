import { Component, ViewChild, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, ModalController, Events, IonicPage, Content, FabButton } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
import { WxServiceProvider } from '../../../providers/wx-service/wx-service';
import { ChatProvider } from '../../../providers/chat/chat';
import { MineProvider } from '../../../providers/mine/mine';
import { GalleryModal } from 'ionic-gallery-modal';

declare let wx;
@IonicPage({
   name: 'ParticularsPage',
   segment: 'particulars/:goodsId/:cutId/:dId/:isActivity',
   defaultHistory: ['classify']
})
@Component({
   selector: 'page-particulars',
   templateUrl: 'particulars.html'
})
export class ParticularsPage {
   showLoading: boolean;
   region_name: any;//用户选中的收货地址
   getCategoryRecommendGoodsHot: any;//为你推荐
   getGoodsInfo: any;//商品总信息
   selectGroupRecommend = "group" || 'recommend';//组合、推荐
   selectPicArguments = "pic";//arguments/pic//详情、参数//comment
   goodsId: number = this.navParams.get('goodsId');//3994 5676//商品id
   badgeCount: number;//购物车数量
   goods_desc: string = '';//图文详情
   is_dingzhi: boolean = false;//定制商品

   cutId = this.navParams.get('cutId');//切边镜架商品id
   dId = this.navParams.get('dId');//切边镜架商品id
   isActivity = this.navParams.get('isActivity') == 1;//是否为活动商品
   product_sn = this.navParams.get('sn') != ':sn' ? this.navParams.get('sn') : null;//是否为活动商品

   @ViewChild('myContent') myContent: Content;
   commentType: any = 0;
   commentData: any;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private http: HttpService,
      public modalCtrl: ModalController,
      public native: Native,
      private events: Events,
      private wxService: WxServiceProvider,
      private chat: ChatProvider,
      private mine: MineProvider,
      private element: ElementRef,
      private renderer: Renderer,
   ) {
   }
   ngOnInit() {
      console.log("商品ID:", this.goodsId);
      this.events.subscribe('car:update', () => {
         this.getCarCount();
      })
      this.getCarCount();
      if (this.cutId > 0) {
         this.http.cutting_info({ id: this.cutId }).then(res => {
            if (res.status) {
               this.goodsId = res.cutting_info.goods_id;
               this.getHttpDetails();
            }
         })
      } else if (this.dId > 0) {
         this.http.info_d({ id: this.dId }).then(res => {
            if (res.status) {
               this.goodsId = res.info.goods_id;
               this.getHttpDetails();
            }
         })
      } else {
         this.getHttpDetails();
      }
   }
   ngAfterViewInit() {
      var ele = this.element.nativeElement.getElementsByClassName('pic-and-arguments');
      this.myContent.ionScroll.subscribe((d) => {
         if (d.scrollTop > ele[0].offsetTop) {
            this.renderer.setElementClass(ele[0], 'fixed', true)
         } else {
            this.renderer.setElementClass(ele[0], 'fixed', false)
         }
         if (ele[0].getElementsByClassName('details')[0].offsetTop < d.contentHeight + d.scrollTop) {
         }
      });
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad ParticularsPage');
   }
	/**
	 * 获取购物车数量
	 */
   getCarCount() {
      this.http.get_flow_goods_number().then((res) => {
         this.badgeCount = res.data;
      })
   }
   getHttpDetails() {
      this.showLoading = true;
      return this.http.goodsInfos({ goods_id: this.goodsId }).then((res) => {
         // console.log("商品详情信息", res);
         this.showLoading = false;
         if (res.status == 1) {
            this.wxService.config({
               title: res.data.goods_name, // 分享标题
               desc: '', // 分享描述
               link: location.href, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
               imgUrl: res.data.goods_thumb, // 分享图标
            })
            this.getGoodsInfo = res;
            this.getRegionName(res);
            this.is_dingzhi = res.data.isdingzhi == 1 ? true : false;//定制商品
         }
         this.getCommentData();
         this.http.getCategoryRecommendGoodsHot({}).then((res) => {
            // console.log('为你推荐：', res)
            if (res.status == 1) {
               this.getCategoryRecommendGoodsHot = res.data;
               /* 组合、推荐的默认标签 */
               if (res.data.length == 0) {
                  this.selectGroupRecommend = "group";
               }
               /* 组合、推荐的默认标签 */
               if (this.getGoodsInfo.fittings.length == 0) {
                  this.selectGroupRecommend = "recommend";
               }
            }
         })
      })
   }
   /* 获取评价 */
   getCommentData(commentType = 0, comment_type = 0) {
      this.commentType = commentType;
      this.http.commentIndex({
         type: commentType,
         comment_type: comment_type,
         goods_id: this.goodsId,
         page: 1
      }, { showToast: false }).then(res => {
         if (res.status == 1) {
            this.commentData = res;
         }
      })
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
         this.native.showToast('已经点赞过啦');
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
   getRegionName(res) {
      for (var i = 0; i < res.sale_city.length; i++) {
         if (res.sale_city[i].selected == 1) {
            this.region_name = res.sale_city[i].region;
         }
      }
   }
   /*下拉刷新*/
   doRefresh(refresher) {
      this.getCarCount();
      this.getHttpDetails().then(() => {
         setTimeout(() => {
            refresher.complete();
         }, 500);
      });
   }
   doInfinite(infiniteScroll) {
      setTimeout(() => {
         infiniteScroll.enable(false);
         this.goods_desc = this.getGoodsInfo.data.goods_desc;
      }, 600);
   }
   picArgumentsChange(e) {
      console.log(e)
   }
   presentModal(str) {
      let modal = this.modalCtrl.create('ParticularsModalPage', {
         name: str,
         getBonus: this.getGoodsInfo.bonus,
         sendto: this.getGoodsInfo.sale_city,
         GoodsInfo: this.getGoodsInfo.data,
         promotion: this.getGoodsInfo.promotion,
         goodsId: this.goodsId
      }, { cssClass: 'my-modal-style' });
      modal.onDidDismiss(data => {
         console.log(data);
         if (data && data.region) {
            this.region_name = data.region;
            this.getHttpDetails().then(() => {
               this.events.publish('home:update');
            });
         }
         if (data == 'goDredgeMoreCityPage') {
            this.navCtrl.push('DredgeMoreCityPage');
         }
      });
      modal.present();
   }
	/**
	 * 除商品属性 弹窗
	 */
   presentModalAttr() {
      this.openAttrModal();
		/* if(this.cutId){
			this.http.cutting_info({ id: this.cutId }).then(res => {
				if(res.status){
					this.openAttrModal(res, 'cut');
				}
			})
		}else{
			this.http.getGoodsAttribute({ goods_id: this.goodsId }).then((res) => {
				if (res.status == 1) {
					if (res.goods_type == 'goods_spectacles') {//镜片商品判断
						// console.log("goods_type ☞'goods_spectacles'", res);
						this.openAttrModal(res, 'goods_spectacles');
					}
					if (res.goods_type == 'goods') {//镜架商品判断
						// console.log("goods_type ☞'goods'", res);
						this.openAttrModal(res, 'goods');
					}
				}
			})
		} */
   }
	/**
	 * 
	 * @param res 商品属性列表
	 * @param type 商品类型（镜片、镜架）
	 */
   openAttrModal() {
      let modal = this.modalCtrl.create('ParticularsModalAttrPage', {
         headData: this.getGoodsInfo.data,
         id: this.goodsId,
         cutId: this.cutId,
         dId: this.dId,
         isActivity: this.isActivity,
         sn: this.product_sn,
         callback: {
            navCtrl: this.navCtrl,
            refresher: (id) => {
               this.goodsId = id;
               return this.getHttpDetails();
            }
         }
      }, { cssClass: 'my-modal-style' });
      modal.onDidDismiss(data => {
         if (!data) return;
         data(this.navCtrl);
      });
      modal.present();
   }
   /*---商品关注----*/
   beCareFor() {
      if (this.getGoodsInfo.data.is_collect) {
         this.http.collectDel({ goods_id: this.goodsId }).then((res) => {
            // console.log("取消商品关注", res);
            if (res.status) {
               this.getGoodsInfo.data.is_collect = 0;
               // this.native.showToast('取消关注')
            }
         });
      } else {
         this.http.getGoodsCollect({ goods_id: this.goodsId }).then((res) => {
            // console.log("商品关注", res);
            if (res.status) {
               this.getGoodsInfo.data.is_collect = 1;
               // this.native.showToast('关注成功')
            }
         });
      }
   }
   goParticularsPage(id) {
      this.navCtrl.push('ParticularsPage', { goodsId: id })
   }
   openCallNumber() {
      this.native.openCallNumber(this.getGoodsInfo.supplier_info.mobile, false);
   }
   goAccountServicePage() {
      // this.chat.qimoChatSDK(this.getGoodsInfo.supplier_info.access_id, this.getGoodsInfo.supplier_info.name, this.getGoodsInfo.supplier_info.logo);
      this.chat.webim({
         supplier_id: this.getGoodsInfo.supplier_info.id,
         goods_id: this.goodsId,
         cutId: this.cutId,
         dId: this.dId,
         isActivity: this.isActivity
      });
   }
   goParticularsHome() {
      this.navCtrl.push('ParticularsHomePage', { suppliersId: this.getGoodsInfo.supplier_info.id });
   }
   goStore() {
      this.navCtrl.push('BrandListPage', { suppliersId: this.getGoodsInfo.supplier_info.id })
   }
   goCart() {
      this.navCtrl.push('CarPage');
   }
}
