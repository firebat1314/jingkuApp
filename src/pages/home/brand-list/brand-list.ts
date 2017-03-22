import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams, Events,Content } from 'ionic-angular';

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
    data: Array<any>;
    res:any;
    currentPage:number = 1;

    paramsData = {
        cat_id: this.listId,
        brand_id:'',
        filter:'',
        min_price:'',
        max_price:'',
        order:'',
        stort:'',
    }
    @ViewChild(Content) mycontent:Content;
    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public httpService: HttpService,
        public events: Events
    ) {
        this.listId = this.navParams.get('listId');
        console.log('列表ID:', this.listId)
    }
    ngAfterViewInit() {
        this.getListData();
    }
    ngAfterViewChecked(){
        this.mycontent.resize();
    }
    getListData() {
        this.httpService.categoryGoods(this.paramsData).then((res) => {
            this.data = res.goods;
            this.res = res;
            this.events.publish('user:listFilter', res);
            console.log('商品列表', res)
        })
    }
    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandListPage');
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
    previousPage(){
        this.currentPage--;
    }
    nextPage(){
        this.currentPage++;
    }
}
