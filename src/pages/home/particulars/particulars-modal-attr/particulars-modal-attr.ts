import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { TofixedPipe } from "../../../../pipes/tofixed/tofixed";

export class goodsSpectaclesParams {
	number = 0;//所填写的商品的数量
	spc = [];//商品选择的属性
	qiujing = '';//所选的球镜
	zhujing = '';//所选的柱镜
	zhouwei = '';//所填写的轴位
}

@IonicPage()
@Component({
	selector: 'page-particulars-modal-attr',
	templateUrl: 'particulars-modal-attr.html',

})
export class ParticularsModalAttrPage {
	goodsId: any = this.navParams.get('id');
	data: any = this.navParams.get('data');
	headData: any = this.navParams.get('headData');
	type: any = this.navParams.get('type');//goods_spectacles||goods

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
	/*自定义镜片信息(添加、删除)*/
	goods: Array<any> = [(new goodsSpectaclesParams)];

	/* 护理液主属性 */
	mainAttrs: any;
	/* 护理液主属性id */
	checkMainAttrId: any;
	/* 护理液主属性数量/瓶 */
	checkMainAttrNum: any = 1;
	/* 属性列表 */
	attrsList: any;

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public viewCtrl: ViewController,
		public httpService: HttpService,
		public native: Native,
		private events: Events
	) { }
	ionViewDidLoad() {
		console.log('ionViewDidLoad ParticularsModalJingjiaPage');
	}
	ngOnInit() {
		if (this.type == 'goods') {
			for (var i in this.data.data) {
				if (this.data.data[i].is_main == 1) {
					this.mainAttrs = this.data.data[i];
					console.log(this.mainAttrs)
					this.checkMainAttrId = this.data.data[i].values[0].id;
					this.checkMainAttrNum = this.data.data[i].values[0].number || 1;
				}
			}
			this.getAttrList();
		}
	}
	/* 获取普通商品属性 */
	getAttrList() {
		//默认选中商品主属性的属性值
		this.httpService.getAttrList({ goods_id: this.goodsId, attr: this.checkMainAttrId }).then((res) => {
			console.log(res)
			this.attrsList = res;
		})
	}
	checkMainAttr() {
		this.clear();
		this.getAttrList();
	}
	clear() {
		this.attrId = [];
		this.attrNumber = [];
		this.numberChangeData = null;
	}
	/*关闭modal弹出*/
	dismiss(data?: any) {
		this.viewCtrl.dismiss(data);
	}
	/*普通商品参数*/
	numberIChange($event, item) {
		item.goods_attr_number = $event;
		var index = this.attrId.indexOf(item.goods_attr_id);
		if (index == -1) {
			this.attrId.push(item.goods_attr_id);
			this.attrNumber.push(item.goods_attr_number);
		} else if (item.goods_attr_number == 0) {


			this.attrId.splice(index, 1)
			this.attrNumber.splice(index, 1)
			// if (this.attrNumber[index] == 0) {
			// 	this.attrId.splice(index, 1);
			// 	this.attrNumber.splice(index, 1);
			// } else {
			// this.attrNumber[index] = item.goods_attr_number;
			// }
		} else {
			this.attrNumber[index] = item.goods_attr_number;
		}
		console.log(this.attrId, this.attrNumber)
		this.httpService.changeGoodsNumber({
			goods_id: this.goodsId,
			goods: {
				spec: this.attrId,
				member: this.attrNumber
			}
		}).then((res) => {
			if (res.status == 1) {
				this.numberChangeData = res;
			}
		})
	}
	/* 镜片数量改变 */
	totalPrices = 0;
	totalNumber = 0;
	jingpianNumberChange($event, it) {
		it.number = $event;
		it.subtotal = (Number($event) * (Number(this.headData.shop_price_formated.substr(1)) * 1000)) / 1000;
		this.totalPrices = 0;
		this.totalNumber = 0;
		for (var i = 0; i < this.goods.length; i++) {
			this.totalNumber += Number(this.goods[i].number);
			this.totalPrices += Number(this.goods[i].subtotal);
		}
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
	addToCart(goCart) {
		/*普通商品添加到购物车*/
		if (this.type == 'goods') {
			/* if(this.attrNumber.length==1&&this.attrNumber[0]==0){
				this.native.showToast('请至少选择一件商品',null,false)
				return;
			} */
			if (this.attrNumber.length == 0) {
				this.native.showToast('请选择商品数量', null, false)
				return;
			}
			this.httpService.addToCartSpec({
				goods_id: this.goodsId,
				goods: { member: this.attrNumber, spec: this.attrId }
			}).then((res) => {
				if (res && res.status == 1) {
					this.native.showToast('添加成功')
					this.events.publish('car:updata');//更新购物车
					this.viewCtrl.dismiss(goCart);
				}
			}).catch((res) => {
				console.log(res)
			})
		}
		/*镜片商品添加到购物车*/
		if (this.type == 'goods_spectacles') {
			// this.viewCtrl.dismiss();
			if (!this.goods[this.goods.length - 1].zhujing) {
				this.native.showToast('球镜与柱镜不能为空', null, false)
				return;
			}
			this.getGoodsParamsArrs();
			for (let i = 0; i < this.memberArr.length; i++) {
				if (!(this.memberArr[i] > 0)) {
					this.native.showToast('请选择商品数量', null, false)
					return;
				}
			}
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
					this.native.showToast('添加成功')
					this.events.publish('car:updata');//更新购物车
					this.viewCtrl.dismiss(goCart);
				}
			}).catch((res) => {
				console.log(res)
			})
			console.log(this.spcArr)
			console.log(this.goods)
		}
	}
	goCarPage() {
		this.addToCart('CarPage');
	}

}
