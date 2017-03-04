import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SingleCardComponent } from '../../../components/single-card/single-card'

import { ParticularsPage } from '../particulars/particulars'
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
    ParticularsPage: any = ParticularsPage;


    constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
        console.log(this.navParams.get('list'))

    }
    ngAfterViewInit() {
        if (this.navParams.get('list') == 'singleHot') {
            this.httpService.getHandpickDetails().then((res) => {
                this.data = res.data;
                console.log(this.data)
            })
        } else {
            this.data = [
                {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }, {
                    id: 1,
                    short_name: '博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段博士伦美瞳明透亮眸半年时段balbalbalalabalabalabala',
                    market_price: '450.00',
                    goods_img: 'assets/icon/homepage_71.png',
                }
            ];
        }
    }
    data: Array<any>;

    doInfinite(infiniteScroll) {
        console.log('Begin async operation');

        setTimeout(() => {
            for (let i = 0; i < 30; i++) {
                this.data.push(this.data.length);
            }

            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad BrandListPage');
    }
    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }
}
