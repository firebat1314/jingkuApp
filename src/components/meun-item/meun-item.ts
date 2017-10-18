import { Component } from '@angular/core';
import { Events } from "ionic-angular";
import { RadiolistModel } from "../../providers/ChecklistModel";
import { Storage } from '@ionic/storage';

@Component({
	selector: 'meun-item',
	templateUrl: 'meun-item.html'
})
export class MeunItemComponent {
	data: any;
	// default_data: any;
	price: any = { lower: 0, upper: 2000 };
	filterParams: any = {
		min_price: null,
		max_price: null,
		brand_id: null,
		// cat_id: null,
		attr_id: null,
		filter: null
	}
	radiolist = new RadiolistModel(this.filterParams)
	radiolist2 = new RadiolistModel(this.filterParams)
	radiolist3 = new RadiolistModel(this.filterParams)
	radiolist4 = new RadiolistModel(this.filterParams.attr_id)

	constructor(
		public events: Events,
		public storage: Storage,
	) {
		this.events.subscribe('user:listFilter', (res) => {
			this.data = res;
			// this.default_data = res;
			this.storage.set('filterList', res);

			this.selectItem(res.goods_attr_arr[0].data, 'brand_id');
			this.selectItem(res.goods_attr_arr[1].data, 'cat_id');
			this.selectPrice(res);
			let firstItem = this.data.goods_attr_arr[2].data[0];
			let index = this.data.goods_attr_arr[2].data.length - 1;
			let lastItem = this.data.goods_attr_arr[2].data[index];
			//初始默认价格
			this.price.lower = firstItem ? firstItem.min_price : 0;
			this.price.upper = lastItem ? lastItem.max_price : 0;
			if (!this.data.goods_attr_arr[0].data.length) {
				this.filterParams.brand_id = null;
			}
			if (!this.data.goods_attr_arr[1].data.length) {
				// this.filterParams.cat_id = null;
			}
			if (!this.data.goods_attr_arr[2].data.length) {
				this.filterParams.min_price = null;
				this.filterParams.max_price = null;
			}
			if (!this.data.goods_attr_arr[3].data.length) {
				this.filterParams.filter = null;
			}
		});
	}
	selectPrice(res) {
		this.filterParams.min_price = null;
		this.filterParams.max_price = null;
		for (var i = 0; i < res.goods_attr_arr[2].data.length; i++) {
			var item = res.goods_attr_arr[2].data[i];
			if (item.selected == 1) {
				this.filterParams.min_price = item.min_price;
				this.filterParams.max_price = item.max_price;
			}
		}
	}
	selectItem(list, name) {
		for (var i = 0; i < list.length; i++) {
			var item = list[i];
			if (item.selected == 1) {
				this.filterParams[name] = item[name];
			}
		}
	}
	confirm() {
		var filter = [];
		this.filterParams.filter = '';
		var data = this.data.goods_attr_arr[3].data
		for (let i = 0; i < data.length; i++) {
			if (data[i].selected || data[i].selected == 0) {
				filter.push(data[i].selected);
			}
		}
		this.filterParams.filter = filter.join('.');
		this.events.publish('user:filterParams', this.filterParams);
		console.log("我一共选择了：", this.filterParams);


	}
	reset() {
		// console.log(this.data == this.default_data)
		// console.log(this.data, this.default_data)
		this.storage.get('filterList').then((res) => {
			this.data = res;
			this.selectPrice(res);
		})
	}
}

