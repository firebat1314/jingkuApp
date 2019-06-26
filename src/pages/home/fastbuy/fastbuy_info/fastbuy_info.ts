
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Events, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../../providers/http-service';
import { MineProvider } from '../../../../providers/mine/mine';
/*
  Generated class for the GlassesDesign page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage({
  name: 'fastbuy_infonPage',
  segment: 'fastbuy_infon/:venumid',
}
 
)
@Component({
  selector: 'page-fastbuy_infon',
  templateUrl: 'fastbuy_info.html'
})
export class fastbuy_infonPage {
  list: any;
  img: any;
  class: any;
  banner: any;
  category:any;
  data:any;
  selected = 0;
  page=0;
  responsetitle:any;
  @ViewChild(Content)
  content: Content;
  venumid: number = this.navParams.get('venumid');//3994 5676//商品id
  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events, public httpService: HttpService, private mine: MineProvider) { }
  ionViewDidLoad() {
    console.log('ionViewDidLoad GlassesDesignPage');
  }
  ngOnInit() {
    this.httpService.venueinfo({venue:this.venumid}).then((data) => {
      if (data.status) {
         this.category = data;
         this.responsetitle=data.data.response.title
         debugger
         console.log(this.category)
      }
   })
    this.promotion()
    this.getData(this.selected);
  }

  scrollToTop() {
    this.content.scrollToTop();
  }
  promotion(){
    return this.httpService.promotions({venue:this.venumid}).then((res)=>{
        // this.list=res.
        this.data = res.response.list;
    })
  }
  //点击分类
  getData(id) {
    debugger
    this.page = 1;
    this.infiniteScroll ? this.infiniteScroll.enable(true) : null;

    this.httpService.promotions({ venue:this.venumid , cate: id }).then((res) => {
       if (res.status == 1) {
          this.data = res.response.list;
          this.selected = id;
       }
    })
 }
//  翻页
infiniteScroll
size=10;
doInfinite(infiniteScroll) {
  this.infiniteScroll = infiniteScroll;
  this.httpService.promotions({ num: this.size, page: ++this.page,}, ).then((res) => {
     if (res.status == 1) {
        if (!res.response.list.length) {
           this.infiniteScroll.enable(false);
        }
        this.data = this.data.concat(res.response.list);
     }
     setTimeout(() => {
        this.infiniteScroll.complete();
     }, 500);
  })
}
goParticularsPage(id) {
  this.navCtrl.push('ParticularsPage', { goodsId: id, isActivity: 1 })
// alert(id)
}
}
