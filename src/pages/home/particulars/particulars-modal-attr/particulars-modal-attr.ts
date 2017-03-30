import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";

export class goodsSpectaclesParams {
	number = 0;//所填写的商品的数量
	spc = [];//商品选择的属性
	qiujing = '';//所选的球镜
	zhujing = '';//所选的柱镜
	zhouwei = '';//所填写的轴位
}
@Component({
	selector: 'page-particulars-modal-attr',
	templateUrl: 'particulars-modal-attr.html',

})
export class ParticularsModalAttrPage {
	goodsId: any;
	data: any;
	headData: any;
	type: any;
	/*goods*/
	attrId: Array<any> = [];
	attrNumber: Array<any> = [];
	/*goods_spectacles*/
	memberArr: Array<any> = [];
	spcArr: Array<any> = [];
	qiujingArr: Array<any> = [];
	zhujingArr: Array<any> = [];
	zhouweiArr: Array<any> = [];

	qiujing: string;
	getZhujingList: any;
	/*自定义镜片信息项目*/
	goods: Array<any> = [new goodsSpectaclesParams];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public httpService: HttpService
	) {
		this.data = this.navParams.get('data');
		this.type = this.navParams.get('type');
		this.headData = this.navParams.get('headData');
		this.goodsId = this.navParams.get('id');
	}
	ngOnInit() {

	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ParticularsModalJingjiaPage');
	}
	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
	numberIChange($event, item) {
		console.log($event)
		item.goods_attr_number = $event;
		if (this.attrId.indexOf(item.goods_attr_id) == -1) {
			this.attrId.push(item.goods_attr_id);
			this.attrNumber.push(item.goods_attr_number);
		} else {
			this.attrNumber[this.attrId.indexOf(item.goods_attr_id)] = item.goods_attr_number;
		}
	}
	qiujingChange(item) {
		this.httpService.getZhujing({
			item: item,
			goods_id: this.goodsId
		}).then((res) => {
			console.log('镜柱属性：', res)
			if (res.status == 1) {
				this.getZhujingList = res;
			}
		})
	}
	increasedJP() {
		this.goods.push(new goodsSpectaclesParams);
	}
	removeJP() {
		this.goods.splice(-1);
	}
	getGoodsParamsArrs() {
		var arr = [];
		for (let i = 0; i < this.goods.length; i++) {
			this.memberArr.push(this.goods[i].number);
			this.qiujingArr.push(this.goods[i].qiujing);
			this.zhujingArr.push(this.goods[i].zhujing);
			this.zhouweiArr.push(this.goods[i].zhouwei);
			// for (var j = 0; j < this.data.specification.length; j++) {
			// 	var element = this.data.specification[j].spc;
			// 	arr.push(element);
			// 	this.spcArr.push(arr);
			// }
		}
	}
	addToCart() {
		if (this.type == 'goods') {
			this.httpService.addToCartSpec({
				goods_id: this.goodsId,
				goods: { member: this.attrNumber, spec: this.attrId }
			}).then((res) => {
				console.log(res)
				if (res.status == 1) {
					this.viewCtrl.dismiss();
				}
			})
		}
		if (this.type == 'goods_spectacles') {
			// this.viewCtrl.dismiss();
			this.getGoodsParamsArrs()
			this.httpService.addToCartSpecJp({
				number: this.memberArr,//所填写的商品的数量
				spc: null,//商品选择的属性
				qiujing: this.qiujingArr,//所选的球镜
				zhujing: this.zhujingArr,//所选的柱镜
				zhouwei: this.zhouweiArr//所填写的轴位
			}).then((res) => {
				console.log(res)
			})
			console.log(this.spcArr)
			console.log(this.goods)
		}
	}
}
