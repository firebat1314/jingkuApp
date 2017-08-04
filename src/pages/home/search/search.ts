import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Search page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  page: any = 1;
  data: any;
  myHomeSearch: String = null;
  @ViewChild(Searchbar) mySearchBar: Searchbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) { }
  ngAfterViewInit() {
    setTimeout(() => {
      this.mySearchBar.setFocus();
    }, 500);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
    this.getHotSearch();
  }
  searchbar(e) {
    if (e) {
      if (e.keyCode == 13) {
        this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch })
      }
    } else {
      this.navCtrl.push('BrandListPage', { keyword: this.myHomeSearch })
    }
  }
  getHotSearch() {
    this.httpService.getHotSearch({
      size: 10,
      page: this.page
    }).then((res) => {
      console.log(res)
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  getNewBatch() {
    this.page < this.data.pagers ? ++this.page : this.page = 1;
    this.getHotSearch();
  }
}
