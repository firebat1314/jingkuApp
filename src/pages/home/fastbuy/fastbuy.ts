import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage, FabButton } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";

/*
  Generated class for the Fastbuy page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
  selector: 'page-fastbuy',
  templateUrl: 'fastbuy.html'
})
export class FastbuyPage {
  data2: any;
  data3: any;
  data4: any;
  data5: any;
  data6: any;
  data: any;

  @ViewChild(Content) content: Content;
  @ViewChild(FabButton) fabButton: FabButton;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
    public elementRef: ElementRef
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FastbuyPage');
    this.getData();
  }
  ngAfterViewInit() {
    /* 回到顶部按钮 */
    this.fabButton.setElementClass('fab-button-out',true);
    this.content.ionScroll.subscribe((d) => {
      this.fabButton.setElementClass("fab-button-in", d.scrollTop >= d.contentHeight);
    });
  }
  getData() {
    this.httpService.presell({ type: 'is_promote', cat_id: 1 }).then((res) => {
      if (res.status == 1) { this.data = res; }
      this.httpService.presell({ type: 'is_promote', cat_id: 2 }).then((res) => {
        if (res.status == 1) { this.data2 = res; }
        this.httpService.presell({ type: 'is_promote', cat_id: 3 }).then((res) => {
          if (res.status == 1) { this.data3 = res; }
          this.httpService.presell({ type: 'is_promote', cat_id: 5 }).then((res) => {
            if (res.status == 1) { this.data4 = res; }
            this.httpService.presell({ type: 'is_promote', cat_id: 4 }).then((res) => {
              if (res.status == 1) { this.data5 = res; }
              this.httpService.presell({ type: 'is_promote', cat_id: 6 }).then((res) => {
                if (res.status == 1) { this.data6 = res; }
              })
            })
          })
        })
      })
    })
  }
  goParticularsPage(id) {
    this.navCtrl.push('ParticularsPage', { goodsId: id })
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
}
