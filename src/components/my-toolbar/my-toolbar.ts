import { Component, ElementRef } from '@angular/core';

/*
  Generated class for the MyToolbar component.

  See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
  for more info on Angular 2 Components.
*/
@Component({
  selector: 'my-toolbar',
  templateUrl: 'my-toolbar.html'
})
export class MyToolbarComponent {

  stort:string ;
  value:string ;

  constructor(
    public element: ElementRef
  ) {
    console.log('Hello MyToolbar Component');
  }
  ngAfterViewInit(){
    // console.log(this.element)
  }

  mytoolChange() {//——_——|||.....
		/*if (this.mytool == 'all') {
			this.paramsData.order = '';
			this.salesNumStatus = true;
			this.shopPriceStatus = true;
			if (this.allStatus) {
				this.paramsData.stort = 'ASC';
				this.allStatus = false;
				this.getListData();
			} else {
				this.allStatus = true;
				this.paramsData.stort = 'DESC';
				this.getListData();
			}
		}
		if (this.mytool == 'sales_num') {
			this.paramsData.order = 'sales_num';
			this.shopPriceStatus = true;
			this.allStatus = true;
			if (this.salesNumStatus) {
				this.paramsData.stort = 'ASC';
				this.salesNumStatus = false;
				this.getListData();
			} else {
				this.salesNumStatus = true;
				this.paramsData.stort = 'DESC';
				this.getListData();
			}
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
		}*/
	}
}
