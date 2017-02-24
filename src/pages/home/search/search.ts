import { Component,ViewChild } from '@angular/core';
import { NavController, NavParams,Searchbar } from 'ionic-angular';

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
  @ViewChild(Searchbar) searchbar: Searchbar;

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.searchbar.setFocus();
  }

}
