import { Component, ViewChild } from '@angular/core';
import { Tabs } from "ionic-angular";

import { HomePage } from '../home/home';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { MyPage } from '../my/my';
@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  @ViewChild("tabs") tabs: Tabs;
  tab1Root: any = HomePage;
  tab2Root: any = AboutPage;
  tab3Root: any = ContactPage;
  tab4Root: any = MyPage;

  constructor() {}
    
 /* ionViewDidLoad() {
    console.log(this.tabs);
  }*/
}
