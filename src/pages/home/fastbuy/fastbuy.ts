import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, Content, IonicPage } from 'ionic-angular';
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
    /*let els1 = this.elementRef.nativeElement.getElementsByClassName('fore2')[0].children;
    let els2 = this.elementRef.nativeElement.getElementsByClassName('fore3');
    for (let i = 0; i < els1.length; i++) {
      els1[i].click(()=>{
        this.content.scrollTo(0,els2[i].offsetTop);
      })
    }*/
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
