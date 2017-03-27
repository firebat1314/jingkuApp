import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';

import { SingleCardComponent } from '../../../components/single-card/single-card'

import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the BrandList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
    selector: 'page-brand-list',
    templateUrl: 'brand-list.html',
})
export class BrandListPage {
    myHomeSearch: String = '';
    listStyleflag: Boolean;
    listId: any;
    data: Array<any>;//列表
    res: any;  //列表属性
    currentPage: number = 1;//当前页
    mytool = 'all';//当前筛选
    paramsData = {
        cat_id: this.listId,
        order: '',
        stort: 'DESC',
        filter: ''
    }
    allStatus = false;
    salesNumStatus = false;
    shopPriceStatus = false;

    @ViewChild(Content) mycontent: Content;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public httpService: HttpService,
        public events: Events
    ) {
        this.listId = this.navParams.get('listId');
        console.log('列表ID:', this.listId)
        this.events.subscribe('user:filterParams', (res) => {
            this.paramsData = Object.assign(this.paramsData, res);
            console.log(this.paramsData)
            this.mytool = 'all';
            this.paramsData.stort = 'DESC';
            this.getListData();
        });
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandListPage');
    }
    ngAfterViewInit() {
        this.getListData();
    }
    ngAfterViewChecked() {
        this.mycontent.resize();
    }
    ngOnDestroy() {
        this.events.unsubscribe('user:filterParams')
    }
    getListData() {
        this.httpService.categoryGoods(this.paramsData).then((res) => {
            this.data = res.goods;
            this.res = res;
            this.events.publish('user:listFilter', res);
            console.log('商品列表', res)
        })
    }
    mytoolChange() {//——_——|||.....
        if (this.mytool == 'all') {
            this.paramsData.order = '';
            this.salesNumStatus = false;
            this.shopPriceStatus = false;
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
            this.shopPriceStatus = false;
            this.allStatus = false;
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
            this.salesNumStatus = false;
            this.allStatus = false;
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
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.httpService.categoryGoods(this.paramsData).then((res) => {
            setTimeout(() => {
                refresher.complete();
            }, 500);
            if (res.status == 1) {
                this.data = res.goods;
            }
        })
    }
    previousPage() {
        this.currentPage--;
    }
    nextPage() {
        this.currentPage++;
    }
}
