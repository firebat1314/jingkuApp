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
  getCategorys: any;

  checkedIndex: number = 0;
  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private httpService: HttpService
  ) {
    this.httpService.getCategoryPre().then((data)=>{
      this.categorys = data;
    })
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad PresellPage');
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out',true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  ngOnInit(){
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
