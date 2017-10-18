import { Component, ViewChild } from '@angular/core';
import { Tabs, Events, IonicPage } from "ionic-angular";
import { HttpService } from "../../providers/http-service";

@IonicPage({
  priority: 'high'
})
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = 'HomePage';
  tab2Root: any = 'ClassifyNewPage';
  tab3Root: any = 'CarPage';
  tab4Root: any = 'NewMyPage';
  carNumber: number = 0;

  @ViewChild("tabs") tabs: Tabs;

  constructor(
    public events: Events,
    public httpService: HttpService,
  ) {
    this.getCarCount();
    this.events.subscribe('car:update', () => {
      this.getCarCount();
    })
  }
  getCarCount() {
    this.httpService.getFlowGoods().then((res) => {//获取购物车数量
      if (res.status == 1) {
        this.carNumber = res.goods_count;
      }
    })
  }
  ionViewDidLoad() {
    // console.log(this.tabs);
  }
}