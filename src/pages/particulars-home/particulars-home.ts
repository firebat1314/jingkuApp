import { Component, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams ,Events} from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { Native } from "../../providers/native";

/**
 * Generated class for the ParticularsHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-particulars-home',
  templateUrl: 'particulars-home.html',
})
export class ParticularsHomePage {
  mytool = 'all';
  myHomeSearch: any;
  alldata: any;
  newdata: any;
  cxdata: any;
  shopdata: any;
  data: any;
  classShop: any = "shopHome";
  typeNumber:any = '0';
  newType:any = '1';
  alltool = 'all';
  listStyleflag: Boolean;


  paramsData = {
		size: 30,
		page: 1,
		brand_id: null,
		cat_id: null,
		order: null,
		stort: 'DESC',
		keywords: this.myHomeSearch,
		supplier_id: null
	}

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public events: Events,
    public native: Native,
    private el: ElementRef,
    private renderer: Renderer,
    private httpService: HttpService
  ) {
    this.httpService.suppliersIndex({ suppliers_id: navParams.get('supplierId') }).then((res) => {
      if (res.status == 1) {
        this.data = res;
        console.log(res);
      }
    })
    this.httpService.getSupplierInfo({ suppliers_id: navParams.get('supplierId') }).then((res) => {
      if (res.status == 1) {
        this.shopdata = res;
        console.log(res);
      }
    })
    this.changeType(this.typeNumber);
    this.NewType(this.newType);


    this.events.subscribe('user:filterParams', (res) => {
			this.paramsData = Object.assign(this.paramsData, res);
			console.log(this.paramsData)
			this.alldata.page = 1;
			this.mytool = 'all';
			this.paramsData.stort = 'DESC';
			this.getAllData();
		});

     this.httpService.categoryGoods(Object.assign(this.paramsData , {suppliers_id: this.navParams.get('supplierId') , new:1})).then((res) => {
      if (res.status == 1) {
        this.alldata = res;
        console.log(res);
        this.events.publish('user:listFilter', res);
      }
    })
  }
  changeType(typeNumber){
       this.httpService.suppliersPromote({ suppliers_id: this.navParams.get('supplierId') , type: typeNumber }).then((res) => {
        if (res.status == 1) {
          this.cxdata = res;
          console.log(res);
        }
      })
  }
  NewType(newType){
    this.httpService.categoryGoods({ suppliers_id: this.navParams.get('supplierId') , new: newType}).then((res) => {
      if (res.status == 1) {
        this.newdata = res;
        console.log(res);
      }
    })
  }

  getAllData(params?) {
		this.httpService.categoryGoods(Object.assign(this.paramsData, params)).then((res) => {
			if (res.status == 1) {
				this.alldata = res;
        console.log(res);
				if (res.goods.length == 0) {
					this.native.showToast('暂无商品')
				}
				this.events.publish('user:listFilter', res);
			}
		})
}

  goParticularsHomeDetails() {
    this.navCtrl.push('ParticularsHomeDetailsPage');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomePage');
  }
  ngAfterViewInit() {
    let shopTabs = this.el.nativeElement.getElementsByClassName('shop-tabs-item');
    let cuXiaoTabs = null;

    //console.log(cuXiaoTabs.length);
    // this.renderer.listen(shopTabs,'onclick',()=>{
    //   console.log(1);
    //   this.renderer.setElementClass(shopTabs,'actived',true)
    // })
    for (var i = 0; i < shopTabs.length; i++) {
      shopTabs[i].index = i;
      shopTabs[0].className = 'shop-tabs-item actived';
      let that = this;
      shopTabs[i].onclick = function () {
        for (var j = 0; j < shopTabs.length; j++) {
          shopTabs[j].className = 'shop-tabs-item';
        }

        this.className = 'shop-tabs-item actived';
        that.classShop = String(this.value);
        //console.log(that.classShop)
        setTimeout( () => {
          if (that.classShop == 'cuXiao') {
            cuXiaoTabs = that.el.nativeElement.getElementsByClassName('cuXiao-tabs-item');
            for (var x = 0; x < cuXiaoTabs.length; x++) {
              cuXiaoTabs[x].index = x;
              cuXiaoTabs[0].className = 'cuXiao-tabs-item actived';
              cuXiaoTabs[x].onclick = function(){
                for (var y = 0; y < cuXiaoTabs.length; y++) {
                  cuXiaoTabs[y].className = 'cuXiao-tabs-item';
                }
                this.className = 'cuXiao-tabs-item actived';
                that.typeNumber = this.index;
                that.changeType(that.typeNumber);
                //console.log(1);
                //console.log(this.value);
                //that.classShop =String(this.value)  
              }
            }
            //console.log(cuXiaoTabs);
          }
        }, 100);
      }
    }
  }
  
  doInfinite(infiniteScroll) {
    if(this.classShop == "allGoods"){
      var page = this.alldata.page;
      if (page < this.alldata.pages) {
        this.httpService.categoryGoods(Object.assign(this.paramsData, { page: ++this.alldata.page ,new:1,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
          if (res.status == 1) {
            console.log(res);
            this.alldata.page = res.page;
            this.alldata.goods = this.alldata.goods.concat(res.goods);
            //Array.prototype.push.apply(this.alldata.goods, res.goods);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
    else if(this.classShop == "goNew"){
      var page = this.newdata.page;
      if (page < this.newdata.pages) {
        this.httpService.categoryGoods({ suppliers_id: this.navParams.get('supplierId') , page: ++page }).then((res) => {
          if (res.status == 1) {
            this.newdata.page = res.page;
            this.newdata.goods = this.newdata.goods.concat(res.goods);
            //Array.prototype.push.apply(this.newdata.goods, res.goods);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
    else if(this.typeNumber == 0){
      var page = this.cxdata.page;
      if (page < this.cxdata.pages) {
        this.httpService.categoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page,type:0,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
          if (res.status == 1) {
            this.cxdata.page = res.page;
            this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
            //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
            
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
    else if(this.typeNumber == 1){
      var page = this.cxdata.page;
      if (page < this.cxdata.pages) {
        this.httpService.categoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page,type:1,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
          if (res.status == 1) {
            this.cxdata.page = res.page;
            //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
            this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
    else if(this.typeNumber == 2){
      var page = this.cxdata.page;
      if (page < this.cxdata.pages) {
        this.httpService.categoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page,type:2,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
          if (res.status == 1) {
            this.cxdata.page = res.page;
            //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
            this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
    else if(this.typeNumber == 3){
      var page = this.cxdata.page;
      if (page < this.cxdata.pages) {
        this.httpService.categoryGoods(Object.assign(this.paramsData, { page: ++this.cxdata.page,type:3,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
          if (res.status == 1) {
            this.cxdata.page = res.page;
            //Array.prototype.push.apply(this.cxdata.goods_list, res.goods_list);
            this.cxdata.goods_list = this.cxdata.goods_list.concat(res.goods_list);
          }
          setTimeout(() => {
            infiniteScroll.complete();
          }, 1500);
        })
      } else {
        infiniteScroll.enable(false);
      }
    }
  }
  // doRefresh(refresher) {
	// 	this.httpService.categoryGoods((this.paramsData ,{new:1,suppliers_id: this.navParams.get('supplierId')})).then((res) => {
	// 		if (res.status == 1) {
	// 			this.alldata = res;
	// 		}
	// 		setTimeout(() => {
	// 			refresher.complete();
	// 		}, 500);
	// 	})
	// }
  
  onInput(event) {
		this.searchGoods()
	}
	searchGoods() {
		this.alldata.page = 1
		this.paramsData = {
			size: 30,
			page: 1,
			brand_id: null,
			cat_id: null,
			order: null,
			stort: 'DESC',
			keywords: this.myHomeSearch,
			supplier_id: null
		}
		this.httpService.categoryGoods(Object.assign(this.paramsData , {suppliers_id: this.navParams.get('supplierId') , new:1})).then((res) => {
			this.alldata = res;
      console.log(res);
			this.events.publish('user:listFilter', res);
		})
	}


all_Status = true;
sales_NumStatus = true;
shop_PriceStatus =true;
alltoolChange() {
		if (this.alltool == 'all') {
			this.paramsData.order = '';
			this.sales_NumStatus = true;
			this.shop_PriceStatus = true;
			if (this.all_Status) {
				this.paramsData.stort = 'ASC';
				this.all_Status = false;
				this.getAllData();
			} else {
				this.all_Status = true;
				this.paramsData.stort = 'DESC';
				this.getAllData();
			}
		}
		if (this.alltool == 'sales_num') {
			this.paramsData.order = 'sales_num';
			this.shop_PriceStatus = true;
			this.all_Status = true;
			if (this.sales_NumStatus) {
				this.paramsData.stort = 'ASC';
				this.sales_NumStatus = false;
				this.getAllData();
			} else {
				this.sales_NumStatus = true;
				this.paramsData.stort = 'DESC';
				this.getAllData();
			}
		}
		if (this.alltool == 'shop_price') {
			this.paramsData.order = 'shop_price';
			this.sales_NumStatus = true;
			this.all_Status = true;
			if (this.shop_PriceStatus) {
				this.paramsData.stort = 'ASC';
				this.shop_PriceStatus = false;
				this.getAllData();
			} else {
				this.shop_PriceStatus = true;
				this.paramsData.stort = 'DESC';
				this.getAllData();
			}
		}
	}
  
  goParticularsPage(goods_id){
    this.navCtrl.push('ParticularsPage',{goodsId:goods_id})
  }
}