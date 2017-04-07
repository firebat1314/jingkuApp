import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";

export class goodsSpectaclesParams {
	number = 1;//所填写的商品的数量
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

	numberChangeData: any;
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
	/*自定义镜片信息项目*/
	goods: Array<any> = [new goodsSpectaclesParams];
	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public httpService: HttpService,
		public native: Native
	) {
		this.data = this.navParams.get('data');
		this.type = this.navParams.get('type');
		this.headData = this.navParams.get('headData');
		this.goodsId = this.navParams.get('id');
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad ParticularsModalJingjiaPage');
	}
	/*关闭modal弹出*/
	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
	/*普通商品参数*/
	numberIChange($event, item) {
		console.log($event)
		item.goods_attr_number = $event;
		var index = this.attrId.indexOf(item.goods_attr_id)
		if (index == -1) {
			this.attrId.push(item.goods_attr_id);
			this.attrNumber.push(item.goods_attr_number);
		} else {
			if (this.attrNumber[index] == 0) {
				this.attrId.splice(index, 1);
				this.attrNumber.splice(index, 1);
			} else {
				this.attrNumber[index] = item.goods_attr_number;
			}
		}
		console.log(this.attrId, this.attrNumber)
		this.httpService.changeGoodsNumber({
			goods_id: this.goodsId,
			goods: {
				spec: this.attrId,
				member: this.attrNumber
			}
		}).then((res) => {
			console.log(res);
			if (res.status == 1) {
				this.numberChangeData = res;
			}
		})
	}
	/*镜片商品参数*/
	getGoodsParamsArrs() {
		this.memberArr = [];
		this.qiujingArr = [];
		this.zhujingArr = [];
		this.zhouweiArr = [];
		var spcArr = [];
		for (let i = 0; i < this.data.specification.length; i++) {
			spcArr.push([]);
		}
		for (let i = 0; i < this.goods.length; i++) {
			this.memberArr.push(this.goods[i].number);
			this.qiujingArr.push(this.goods[i].qiujing);
			this.zhujingArr.push(this.goods[i].zhujing);
			this.zhouweiArr.push(this.goods[i].zhouwei);
			for (var j = 0; j < this.data.specification.length; j++) {
				spcArr[j].push(this.goods[i][this.data.specification[j].name])
			}
		}
		this.spcArr = spcArr;
	}
	/*镜片商品添加删除 项目*/
	increasedJP() {
		if (!this.goods[this.goods.length - 1].zhujing) {
			this.native.showToast('球镜与柱镜不能为空')
			return;
		} else {
			this.goods.push(new goodsSpectaclesParams);
		}
	}
	removeJP() {
		this.goods.splice(-1);
	}
	/*根据球镜选择柱镜*/
	qiujingChange(item) {
		this.httpService.getZhujing({
			item: item.qiujing,
			goods_id: this.goodsId
		}).then((res) => {
			console.log('镜柱属性：', res)
			if (res.status == 1) {
				item.getZhujingList = res;
			}
		})
	}
	/*添加到购物车*/
	addToCart() {
		/*普通商品添加到购物车*/
		if (this.type == 'goods') {
			this.httpService.addToCartSpec({
				goods_id: this.goodsId,
				goods: { member: this.attrNumber, spec: this.attrId }
			}).then((res) => {
				console.log(res)
				if (res && res.status == 1) {
					this.native.showToast('添加成功~')
					this.viewCtrl.dismiss();
				}
			})
		}
		/*镜片商品添加到购物车*/
		if (this.type == 'goods_spectacles') {
			// this.viewCtrl.dismiss();
			if (!this.goods[this.goods.length - 1].zhujing) {
				this.native.showToast('球镜与柱镜不能为空')
				return;
			}
			this.getGoodsParamsArrs()
			this.httpService.addToCartSpecJp({
				goods_id: this.goodsId,
				goods: {
					member: this.memberArr,//所填写的商品的数量
					spc: this.spcArr,//商品选择的属性
					qiujing: this.qiujingArr,//所选的球镜
					zhujing: this.zhujingArr,//所选的柱镜
					zhouwei: this.zhouweiArr//所填写的轴位
				}
			}).then((res) => {
				console.log(res)
				if (res && res.status == 1) {
					this.native.showToast('添加成功~')
					this.viewCtrl.dismiss();
				}
			})
			console.log(this.spcArr)
			console.log(this.goods)
		}
	}

}
