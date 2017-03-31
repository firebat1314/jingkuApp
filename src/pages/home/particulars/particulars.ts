import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
/*http服务*/
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";


import { ParticularsModalPage } from "./particulars-modal/particulars-modal"
import { ParticularsModalAttrPage } from "./particulars-modal-attr/particulars-modal-attr";
/*
  Generated class for the Particulars page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-particulars',
	templateUrl: 'particulars.html'
})
export class ParticularsPage {
	getCategoryRecommendGoodsHot: any;
	getLinkedGoods: any;
	getGoodsAttribute: any;
	getGoodsGallery: any;
	getPriceSection: any;
	getGoodsInfo: any;
	getGoodsParameter: any;
	getGoodsSaleCity: any;
	getSupplierInfo: any;
	getBonus: any;
	getGoodsFittings: any;
	collectDel: any;
	searchGoods: any;
	care: any;

	selectGroupRecommend = "group";
	selectPicArguments = "pic";

	goodsId: number;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		private http: HttpService,
		public modalCtrl: ModalController,
		public native: Native
	) {
		this.goodsId = this.navParams.get('goodsId') || '5676';/*3994*/
		console.log("商品ID:", this.goodsId)
	}
	ngOnInit() {
		this.getHttpDetails();
	}
	ngAfterViewInit() { }
	getHttpDetails(finished?) {
		this.http.getGoodsGallery({ goods_id: this.goodsId }).then((res) => {
			console.log("商品详情的相册图片轮播", res);
			if (res.status == 1) { this.getGoodsGallery = res.data; }
			this.http.getPriceSection({ goods_id: this.goodsId }).then((res) => {
				console.log("获取商品价格优惠区间", res);
				if (res.status == 1) { this.getPriceSection = res; }
				this.http.getGoodsInfo({ goods_id: this.goodsId }).then((res) => {
					console.log("商品详情信息", res);
					if (res.status == 1) { this.getGoodsInfo = res.data; }
					this.http.getGoodsParameter({ goods_id: this.goodsId }).then((res) => {
						console.log("获取商品参数", res);
						if (res.status == 1) { this.getGoodsParameter = res.data; }
						this.http.getSupplierInfo({ goods_id: this.goodsId }).then((res) => {
							console.log("获取供应商信息", res);
							if (res.status == 1) { this.getSupplierInfo = res.data; }
							this.http.getGoodsFittings({ goods_id: this.goodsId }).then((res) => {
								console.log("组合商品", res);
								if (res.status == 1) { this.getGoodsFittings = res; }
								this.http.getLinkedGoods({ goods_id: this.goodsId }).then((res) => {
									console.log("关联商品", res);
									if (res.status == 1) { this.getLinkedGoods = res.data; }
									this.http.getBonus({ goods_id: this.goodsId }).then((res) => {
										console.log("优惠券列表", res);
										if (res.status == 1) { this.getBonus = res.data; }
										this.http.getGoodsSaleCity({ goods_id: this.goodsId }).then((res) => {
											console.log("获取商品的销售区域", res);
											if (res.status == 1) { this.getGoodsSaleCity = res.data; }
											this.http.getCategoryRecommendGoodsHot({}).then((res) => {
												console.log('为你推荐：', res)
												if (res.status == 1) { this.getCategoryRecommendGoodsHot = res.data; }
												if (finished) { finished() }
											})
										});
									});
								});
							});
						});
					});
				});
			});
		});
	}
	/*下拉刷新*/
	doRefresh(refresher) {
		this.getHttpDetails(() => {
			setTimeout(() => {
				refresher.complete();
			}, 500);
		});
	}
	presentModal(str) {
		let modal = this.modalCtrl.create(ParticularsModalPage, { name: str, getBonus: this.getBonus, sendto: this.getGoodsSaleCity });
		modal.onDidDismiss(data => {
			console.log(data);
		});
		modal.present();
	}
	presentModalAttr() {
		this.http.getGoodsAttribute({ goods_id: this.goodsId }).then((res) => {
			console.log("商品初始属性", res);
			this.getGoodsAttribute = res;
			if (res.status == 1) {
				if (res.goods_type == 'goods_spectacles') {
					console.log("goods_type ☞'goods_spectacles'", res);
					this.openAttrModal(res, 'goods_spectacles');
				}
				if (res.goods_type == 'goods') {
					this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
						console.log("goods_type ☞'goods'", res);
						this.openAttrModal(res, 'goods');
					})
				}
			}
		})
	}
	openAttrModal(res, type) {
		let modal = this.modalCtrl.create(ParticularsModalAttrPage, { data: res, type: type, headData: this.getGoodsInfo, id: this.goodsId });
		modal.onDidDismiss(data => {
			console.log(data);
		});
		modal.present();
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad ParticularsPage');
	}
	/*---关注----*/
	beCareFor() {
		if (this.getGoodsInfo.is_collect) {
			this.http.collectDel({ goods_id: 3994 }).then((res) => {
				console.log("取消商品关注", res);
				if (res.status) {
					this.getGoodsInfo.is_collect = 0;
				}
			});
		} else {
			this.http.getGoodsCollect({ goods_id: 3994 }).then((res) => {
				console.log("商品关注", res);
				if (res.status) {
					this.getGoodsInfo.is_collect = 1;
				}
			});
		}
	}
	addToShoppingCart() {
		if (this.getGoodsAttribute.status == 1) {
			if (this.getGoodsAttribute.goods_type == 'goods') {
				this.http.getAttrList({ goods_id: this.goodsId }).then((res) => {
					console.log("goods_type ☞'goods'", res);
					this.http.addToCartSpec().then((res) => {
						console.log('普通商品加入购物车：', res)
					})
				})
			}
			if (this.getGoodsAttribute.goods_type == 'goods_spectacles') {
				console.log("goods_type ☞'goods_spectacles'");
				this.http.addToCartSpecJp().then((res) => {
					console.log('镜片商品加入购物车：', res)
				})
			}
		}
	}
	openCallNumber() {
		this.native.openCallNumber(this.getSupplierInfo.mobile, true);
	}

}
