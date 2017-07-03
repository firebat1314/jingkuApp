import { Component, Renderer, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpService } from "../../providers/http-service";
import { ParticularsHomeDetailsPage } from "../particulars-home-details/particulars-home-details";
import { ParticularsPage } from "../home/particulars/particulars";


/**
 * Generated class for the ParticularsHomePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-particulars-home',
  templateUrl: 'particulars-home.html',
})
export class ParticularsHomePage {
  newdata: any;
  cxdata: any;
  shopdata: any;
  data: any;
  classShop: any = "shopHome";
  typeNumber:any = '0';
  newType:any = '1';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private el: ElementRef,
    private renderer: Renderer,
    private httpService: HttpService
  ) {
    this.httpService.suppliersIndex({ supplier_id: navParams.get('supplierId') }).then((res) => {
      if (res.status == 1) {
        this.data = res;
        console.log(res);
      }
    })
    this.httpService.getSupplierInfo({ supplier_id: navParams.get('supplierId') }).then((res) => {
      if (res.status == 1) {
        this.shopdata = res;
        console.log(res);
      }
    })
    this.changeType(this.typeNumber);
    this.NewType(this.newType);
  }
  changeType(typeNumber){
       this.httpService.suppliersPromote({ supplier_id: this.navParams.get('supplierId') , type: typeNumber }).then((res) => {
        if (res.status == 1) {
          this.cxdata = res;
          console.log(res);
        }
      })
  }
  NewType(newType){
    this.httpService.categoryGoods({ supplier_id: this.navParams.get('supplierId') , new: newType}).then((res) => {
      if (res.status == 1) {
        this.newdata = res;
        console.log(res);
      }
    })
  }
  goParticularsHomeDetails() {
    this.navCtrl.push(ParticularsHomeDetailsPage);
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad ParticularsHomePage');
  }
  ngAfterViewInit() {
    let shopTabs = this.el.nativeElement.getElementsByClassName('shop-tabs-item');
    let cuXiaoTabs = null;

    //console.log(cuXiaoTabs.length);
    // this.renderer.listen(shopTabs,'onclick',()=>{
    //   console.log(1);
    //   this.renderer.setElementClass(shopTabs,'actived',true)
    // })
    for (var i = 0; i < shopTabs.length; i++) {
      shopTabs[i].index = i;
      shopTabs[0].className = 'shop-tabs-item actived';
      let that = this;
      shopTabs[i].onclick = function () {
        for (var j = 0; j < shopTabs.length; j++) {
          shopTabs[j].className = 'shop-tabs-item';
        }

        this.className = 'shop-tabs-item actived';
        that.classShop = String(this.value);
        //console.log(that.classShop)
        setTimeout( () => {
          if (that.classShop == 'cuXiao') {
            cuXiaoTabs = that.el.nativeElement.getElementsByClassName('cuXiao-tabs-item');
            for (var x = 0; x < cuXiaoTabs.length; x++) {
              cuXiaoTabs[x].index = x;
              cuXiaoTabs[0].className = 'cuXiao-tabs-item actived';
              cuXiaoTabs[x].onclick = function(){
                for (var y = 0; y < cuXiaoTabs.length; y++) {
                  cuXiaoTabs[y].className = 'cuXiao-tabs-item';
                }
                this.className = 'cuXiao-tabs-item actived';
                that.typeNumber = this.index;
                that.changeType(that.typeNumber);
                //console.log(1);
                //console.log(this.value);
                //that.classShop =String(this.value)  
              }
            }
            //console.log(cuXiaoTabs);
          }
        }, 100);
      }
    }
  }
  doInfinite(infiniteScroll) {
    var page = this.newdata.page;
    if (page < this.newdata.pages) {
      this.httpService.categoryGoods({ supplier_id: this.navParams.get('supplierId') , page: ++page }).then((res) => {
        if (res.status == 1) {
          this.newdata.page = res.page;
          Array.prototype.push.apply(this.newdata.goods, res.goods);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 1500);
      })
    } else {
      infiniteScroll.enable(false);
    }
  }
  goParticularsPage(goods_id){
    this.navCtrl.push(ParticularsPage,{goodsId:goods_id})
  }
}
