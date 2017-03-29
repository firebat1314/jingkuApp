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
    data;
    currentPage: number = 1;//当前页
    mytool = 'all';//当前筛选
    paramsData = {
        cat_id: this.listId,
        size:20,
        order: '',
        stort: 'DESC',
        filter: ''
    }
    allStatus = true;
    salesNumStatus = true;
    shopPriceStatus = true;

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
        //退出页面取消时间订阅
        this.events.unsubscribe('user:filterParams')
    }
    getListData(params?) {
        this.httpService.categoryGoods(Object.assign(this.paramsData,params)).then((res) => {
            this.data = res;
            this.events.publish('user:listFilter', res);
            console.log('商品列表', res)
        })
    }
    searchGoods(){
        this.currentPage = 1;
        this.getListData({
            keywords:this.myHomeSearch
        })
    }
    onInput(event){
        this.searchGoods()
    }
    mytoolChange() {//——_——|||.....
        if (this.mytool == 'all') {
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
        }
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);
        this.httpService.categoryGoods(this.paramsData).then((res) => {
            setTimeout(() => {
                refresher.complete();
            }, 500);
            if (res.status == 1) {
                this.data = res;
                console.log('商品列表', res)
            }
        })
    }
    previousPage() {
        if(this.currentPage<=1){return}
        this.currentPage--;
        let pagingParam = Object.assign({page:this.currentPage},this.paramsData);
        this.httpService.categoryGoods(pagingParam).then((res) => {
            this.data = res;
            console.log('商品列表', res)
        })
    }
    nextPage() {
        if(this.currentPage>=this.data.pages){return}
        this.currentPage++;
        let pagingParam = Object.assign({page:this.currentPage},this.paramsData);
        this.httpService.categoryGoods(pagingParam).then((res) => {
            this.data = res;
            console.log('商品列表', res)
        })
    }
}
