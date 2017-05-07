import { Component } from '@angular/core';
import { Events } from "ionic-angular";
import { RadiolistModel } from "../../providers/ChecklistModel";

@Component({
	selector: 'meun-item',
	templateUrl: 'meun-item.html'
})
export class MeunItemComponent {
	data: any;
	price: any = { lower: 0, upper: 2000 };
	filterParams: any = {
		min_price: this.price.lower,
		max_price: this.price.upper,
		brand_id: 0,
		cat_id: null,
		attr_id: null,
		filter: ''
	}
	radiolist = new RadiolistModel(this.price)
	radiolist2 = new RadiolistModel(this.filterParams)
	radiolist3 = new RadiolistModel(this.filterParams)
	radiolist4 = new RadiolistModel(this.filterParams.attr_id)

	constructor(
		public events: Events
	) {
		this.events.subscribe('user:listFilter', (res) => {
			this.data = res;
		});
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
		console.log("我一共选择了：", this.filterParams);
		this.events.publish('user:filterParams', this.filterParams);
	}
}

