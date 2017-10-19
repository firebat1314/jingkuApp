import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

@IonicPage()
@Component({
  selector: 'page-presell',
  templateUrl: 'presell.html'
})
export class PresellPage {
  categorys: any;
  data: any;

  checkedIndex: number = 1;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {
    this.httpService.getCategoryPre().then((data) => {
      this.categorys = data.data || [];
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PresellPage');
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out', true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  ngOnInit() {
    this.getPresell();
  }
  getList(id) {
    this.checkedIndex = id;
    this.getPresell(id);
  }
  getPresell(id = this.checkedIndex) {
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
