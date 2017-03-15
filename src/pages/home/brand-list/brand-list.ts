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

    listId:any;
    data: Array<any>;

    constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpService) {
        this.listId = this.navParams.get('listId')
        console.log('列表ID:',this.listId)
    }
    ngAfterViewInit() {
        this.httpService.categoryGoods({cat_id:this.listId}).then((res) => {
            this.data = res.goods;
            console.log('商品列表',res)
        })
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
    doInfinite(infiniteScroll) {
        console.log('Begin async operation');
        setTimeout(() => {
            console.log('Async operation has ended');
            infiniteScroll.complete();
        }, 500);
    }
}
