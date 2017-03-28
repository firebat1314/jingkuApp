import { Component, ViewChild } from '@angular/core';
import { Tabs, Events } from "ionic-angular";

import { HomePage } from '../home/home';
import { ClassifyPage } from '../classify/classify';
import { CarPage } from '../car/car';
import { MyPage } from '../my/my';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild("tabs") tabs: Tabs;
  tab1Root: any = HomePage;
  tab2Root: any = ClassifyPage;
  tab3Root: any = CarPage;
  tab4Root: any = MyPage;
  carNumber: number;
  constructor(
    public events: Events
  ) {
    this.events.subscribe('user:carNumber', (res) => {
      this.carNumber = res;
    })
  }

  /* ionViewDidLoad() {
     console.log(this.tabs);
   }*/
}