import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar } from 'ionic-angular';
import { BrandListPage } from "../brand-list/brand-list";

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  myHomeSearch: String = '';
  @ViewChild(Searchbar) mySearchBar: Searchbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mySearchBar.setFocus();
    }, 1000)
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  searchbar(e) {
    if(e.keyCode==13){
      this.navCtrl.push(BrandListPage,{keyword:this.myHomeSearch})
    }
  }
}
