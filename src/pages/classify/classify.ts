import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides,Searchbar,Nav } from 'ionic-angular';

import { SubnavPage1Page } from './subnav-page1/subnav-page1'
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
  root = SubnavPage1Page;
  showBackBtn:boolean = false;
  @ViewChild('mySlides') mySlides: Slides;
  @ViewChild('mySearchBar') mySearchBar:Searchbar;
  @ViewChild('myNav') myNav:Nav;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }
  ngAfterViewInit(){
    
  }
  goToSlide() {
    switch (this.classSelect) {
      case 'classify': this.mySlides.slideTo(0); break;
      case 'brand': this.mySlides.slideTo(1); break;
      case 'care': this.mySlides.slideTo(2);
    }
  }
  pop(){
    if(this.myNav.canGoBack()){
      this.myNav.pop();
    }
  }
  getFous(){
    this.mySearchBar.setFocus();
  }
  slideChanged() {
    switch (this.mySlides.getActiveIndex()) {
      case 0: this.classSelect = 'classify'; break;
      case 1: this.classSelect = 'brand'; break;
      case 2: this.classSelect = 'care';
    }

  }
}
