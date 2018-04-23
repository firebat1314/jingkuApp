import { Component, ViewChild, ElementRef, Renderer, ChangeDetectorRef } from '@angular/core';
import { NavController, NavParams, Events, Content, IonicPage, FabButton, InfiniteScroll, MenuController } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";
/*
  Generated class for the BrandList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
	segment: 'brand-list/:listId/:keyword/:brandId/:supplierId/:type/:cut'
})
@Component({
	selector: 'page-brand-list',
	templateUrl: 'brand-list.html',
})
export class BrandListPage {
	is_jingjia_style: any;
	goodsList: any;
	timer: any;
	infiniteScroll: InfiniteScroll;
	data: any;
	goodsCount: any;//购物车商品数量
	listStyleflag: Boolean;//列表样式切换
	listStyleLock: Boolean;//列表样式 锁定
	mytool = 'all';//当前筛选

	isCut;

	paramsData = {
		size: 30,
		page: 1,
		brand_id: null,
		cat_id: this.navParams.get('listId'),
		order: null,
		stort: 'DESC',
		keywords: null,
		supplier_id: null,
		type: null
	}
	@ViewChild(Content) content: Content;
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public httpService: HttpService,
		public events: Events,
		public native: Native,
		public element: ElementRef,
		public renderer: Renderer,
		public ref: ChangeDetectorRef,
		public menuCtrl: MenuController
	) { }
	ionViewDidLoad() {
		console.log('ionViewDidLoad BrandListPage');
	}
	ngOnInit() {
		this.paramsData.cat_id = this.navParams.get('listId') == ':listId' ? null : this.navParams.get('listId');
		this.paramsData.brand_id = this.navParams.get('brandId') == ':brandId' ? null : this.navParams.get('brandId');
		this.paramsData.supplier_id = this.navParams.get('supplierId') == ':supplierId' ? null : this.navParams.get('supplierId');
		this.paramsData.keywords = this.navParams.get('keyword') == ':keyword' ? null : this.navParams.get('keyword');
		this.paramsData.type = this.navParams.get('type') == ':type' ? null : this.navParams.get('type');
		this.isCut = this.navParams.get('type') == ':cut' ? null : this.navParams.get('cut');
		console.log('cat_id:', this.paramsData.cat_id);
		console.log('brand_id:', this.paramsData.brand_id);
		console.log('supplier_id:', this.paramsData.supplier_id);
		console.log('keywords:', this.paramsData.keywords);
		console.log('type:', this.paramsData.type);

		this.getListData();
		this.getCarNumver();
		this.events.subscribe('user:filterParams', (res) => {
			this.paramsData = Object.assign(this.paramsData, res);
			console.log(this.paramsData)
			this.getListData();
		});
		this.events.subscribe('car:update', () => {
			this.getCarNumver();
		});
	}
	ngAfterViewInit() {
		var pagebtn = this.element.nativeElement.querySelector('#pagebtn');
		// var cardbox = this.element.nativeElement.querySelector('single-foods-card');
		this.content.ionScroll.subscribe((d) => {
			clearTimeout(this.timer);
			/* for (let i = 0; i < this.data.page; i++) {
				const element = this.element.nativeElement.querySelectorAll('.card')[i * 30];
				console.log(element.offsetTop,d.scrollTop,d.scrollTop + d.contentHeight)
				if (element.offsetTop <= d.scrollTop + d.contentHeight) {
					this.onpage = i + 1;
				}
			} */
			this.renderer.setElementClass(pagebtn, 'fab-button-fadein', true);
		});
		this.content.ionScrollEnd.subscribe((d) => {
			this.timer = setTimeout(() => {
				this.renderer.setElementClass(pagebtn, 'fab-button-fadein', false)
			}, 500);
		});
	}
	ngOnDestroy() {
		console.log('user:filterParams')
		//退出页面取消事件订阅
		this.events.unsubscribe('user:filterParams');
	}
	getListData() {
		this.getCarNumver();
		this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
		if (this.isCut > 0) {//切边镜片
			return this.httpService.cutting_list(Object.assign(this.paramsData, { page: 1 })).then((res) => {
				if (res.status == 1) {
					this.data = res;
					this.is_jingjia_style = true;
					this.goodsList = res.goods;
					this.content.resize();
					this.content.scrollToTop(0);
					// this.events.publish('user:listFilter', res);
				}
			})
		} else {
			return this.httpService.categoryGoods(Object.assign(this.paramsData, { page: 1 }), { showLoading: true }).then((res) => {
				if (res.status == 1) {
					res.is_jingpian && !this.listStyleLock ? this.listStyleflag = true : null;
					this.data = res;
					this.is_jingjia_style = res.is_jingjia;
					this.goodsList = res.goods;
					this.content.resize();
					this.content.scrollToTop(0);
					this.events.publish('user:listFilter', res);
				}
			})
		}
	}
	doRefresh(refresher) {
		this.getListData().then(() => {
			setTimeout(() => {
				refresher.complete();
			}, 500);
		})
	}
	doInfinite(infiniteScroll) {
		this.infiniteScroll = infiniteScroll;
		let page = this.data.page
		if (this.data.page < this.data.pages) {
			let p = this.data.page;
			let pagingParam = Object.assign(this.paramsData, { page: ++p });
			if (this.isCut > 0) {//切边镜片
				this.httpService.cutting_list(pagingParam, { showLoading: false }).then((res) => {
					if (res.status == 1) {
						this.data = res;
						this.content.resize();
						this.goodsList = [...this.goodsList,...res.goods]
					}
					setTimeout(() => {
						this.infiniteScroll.complete();
					}, 500);
				})
			} else {
				this.httpService.categoryGoods(pagingParam, { showLoading: false }).then((res) => {
					if (res.status == 1) {
						this.data = res;
						this.content.resize();
						this.goodsList = [...this.goodsList,...res.goods]
					}
					setTimeout(() => {
						this.infiniteScroll.complete();
					}, 500);
				})
			}
		} else {
			this.infiniteScroll.enable(false);
		}
	}
	getCarNumver() {
		this.httpService.get_flow_goods_number().then((res) => {
			if (res.status == 1) {
				this.goodsCount = res.data;
			}
		})
	}
	onKeypress(event) {
		if (event.keyCode == 13) {
			this.searchGoods()
		}
	}
	searchGoods() {
		this.paramsData.cat_id = null;
		this.getListData();
	}
	ionClear() {
		this.paramsData.keywords = null;
		this.getListData();
	}
	allStatus = true;
	salesNumStatus = true;
	shopPriceStatus = true;
	mytoolChange() {//——_——|||.....
		this.infiniteScroll ? this.infiniteScroll.enable(true) : null;
		if (this.mytool == 'all') {

			this.paramsData.order = '';
			this.salesNumStatus = true;
			this.shopPriceStatus = true;
			this.paramsData.stort = 'DESC';
			/* if (this.allStatus) {
			this.paramsData.stort = 'ASC';
			this.allStatus = false;
			this.getListData();
		} else {
			this.allStatus = true;
			this.paramsData.stort = 'DESC';
			this.getListData();
		} */
			this.getListData();
		}
		if (this.mytool == 'sales_num') {

			this.paramsData.order = 'sales_num';
			this.allStatus = true;
			this.shopPriceStatus = true;
			this.paramsData.stort = 'DESC';
			/* if (!this.salesNumStatus) {
				this.paramsData.stort = 'ASC';
				this.salesNumStatus = true;
				this.getListData();
			} else {
				this.salesNumStatus = false;
				this.paramsData.stort = 'DESC';
				this.getListData();
			} */
			this.getListData();
		}
		if (this.mytool == 'shop_price') {
			this.paramsData.order = 'shop_price';
			this.salesNumStatus = true;
			this.allStatus = true;
			if (this.shopPriceStatus) {
				this.paramsData.stort = 'ASC';
				this.shopPriceStatus = false;
				this.getListData();
			} else {
				this.shopPriceStatus = true;
				this.paramsData.stort = 'DESC';
				this.getListData();
			}
		}
	}
	openMenu(e) {
		e.stopPropagation();
		this.menuCtrl.toggle();
	}
	goCarPage() {
		this.navCtrl.push('CarPage');
	}
}
