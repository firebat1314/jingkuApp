import { Component, ViewChild } from '@angular/core';
import { Tabs, Events, IonicPage } from "ionic-angular";
import { HttpService } from "../../providers/http-service";
import { MineProvider } from '../../providers/mine/mine';

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
    public mine: MineProvider,
  ) {
    
  }
  ngOnInit(){
    this.getCarCount();
    this.events.subscribe('car:update', () => {
      this.getCarCount();
    })
    /* this.mine.currentUser.subscribe(data => {
      this.httpService.setByName('userInfo', data);
    }) */
    this.mine.getUser();
  }
  getCarCount() {
    this.httpService.get_flow_goods_number().then((res) => {//获取购物车数量
      if (res.status == 1) {
        this.carNumber = res.data;
      }
    })
  }
  
  ionViewDidLoad() {
    // console.log(this.tabs);
  }
}