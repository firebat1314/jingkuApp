import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

@IonicPage()
@Component({
  selector: 'page-presell',
  templateUrl: 'presell.html'
})
export class PresellPage {
  data: any;
  getCategorys: any;

  checkedIndex: number = 0;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {}
  ionViewDidLoad() {
    console.log('ionViewDidLoad PresellPage');
    this.httpService.getCategorys().then((res) => {
      if (res.status == 1) { this.getCategorys = res.data; }
    })
    this.getPresell();
  }
  getList(index) {
    this.checkedIndex = index;
    let id = this.getCategorys[index].cat_id;
    this.getPresell(id);
  }
  getPresell(id = 1) {
    this.httpService.presell({ cat_id: id }).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id });
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
