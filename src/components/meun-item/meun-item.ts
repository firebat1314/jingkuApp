import { Component, Input, ViewChild } from '@angular/core';
import { Events } from "ionic-angular";
import { ChecklistModel, RadiolistModel } from "../../providers/ChecklistModel";

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
		brand_id:0,
		cat_id:null
	}
	radiolist3 = new RadiolistModel(this.filterParams)
	radiolist2 = new RadiolistModel(this.filterParams)
	radiolist = new RadiolistModel(this.price)

	constructor(
		public events: Events
	) {
		this.events.subscribe('user:listFilter', (res) => {
			this.data = res;
		});
		
	}
	confirm() {
		// console.log("我一共选择了：", this.filterParams);
		this.events.publish('user:filterParams', this.filterParams)
	}
}

