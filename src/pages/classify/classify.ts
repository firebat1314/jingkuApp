import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, Slides, Searchbar, Nav } from 'ionic-angular';

import { SubnavPage1Page } from './subnav-page1/subnav-page1'
import { HttpService } from "../../providers/http-service";
import { MoreBrandPage } from "./more-brand/more-brand";
/*
  Generated class for the Classify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classify',
  templateUrl: 'classify.html'
})
export class ClassifyPage {
  classSelect: any = 'classify';
  careSelect: any = 'shop';
  root = SubnavPage1Page;
  showBackBtn: boolean = false;
  showCheckBox: boolean = false;

  getCategorys;
  getChildrenCaCtegory;
  categoryGoods;
  getGoodsAttribute;

  @ViewChild('mySearchBar') mySearchBar: Searchbar;
  @ViewChild('myNav') myNav: Nav;
  @ViewChild(Content) content: Content;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public httpService: HttpService,
  ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }
  ngOnInit() {
    this.httpService.getCategorys().then((res) => {
      console.log('获取九大分类', res)
      this.getCategorys = res.data;
    })
    this.httpService.getChildrenCaCtegory().then((res) => {
      console.log('获取九大分类下的子分类', res)
      this.getChildrenCaCtegory = res;
    })
    this.httpService.categoryGoods().then((res) => {
      console.log('商品分类列表页(筛选)', res)
      this.categoryGoods = res;
    })
    this.httpService.getGoodsAttribute().then((res) => {
      console.log('获取初始商品属性', res)
      this.getGoodsAttribute = res;
    })

  }
  checkBoxToggle() {
    this.showCheckBox = !this.showCheckBox;
    console.log('content更新~')
  }
  ngOnDestroy() {
    this.showCheckBox = false;
  }
  ngAfterViewInit() {
    if (this.classSelect == "classify") {
      setInterval(() => {
        if (!this.myNav.canGoBack()) {
          this.showBackBtn = false;
        } else {
          this.showBackBtn = true;
        }
      }, 1000)
    }
  }
  ngAfterContentChecked() {
    this.content.resize();
  }
  goToSlide() {
    /*switch (this.classSelect) {
      case 'classify': this.mySlides.slideTo(0); break;
      case 'brand': this.mySlides.slideTo(1); break;
      case 'care': this.mySlides.slideTo(2);
    }*/
  }
  goToMoreBrand() {
    this.navCtrl.push(MoreBrandPage)
  }
  pop() {
    if (this.myNav.canGoBack()) {
      this.myNav.pop();
    }
  }
  getFous() {
    this.mySearchBar.setFocus();
  }
  slideChanged() {
    /*switch (this.mySlides.getActiveIndex()) {
      case 0: this.classSelect = 'classify'; break;
      case 1: this.classSelect = 'brand'; break;
      case 2: this.classSelect = 'care';
    }*/
  }
  panEvent(e) {
    e.stopPopagation;
    console.log(e)
  }
}
