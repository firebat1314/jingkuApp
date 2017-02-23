import { Component, ViewChild } from '@angular/core';

import { NavController, Events, Slides,Content } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';


import { DirectiveTestPage } from '../directive-test/directive-test'
import { CityPage } from './city/city'
import { SearchPage } from './search/search'
import { DetailsPage } from './details/details'

import { UserData } from "../../services/user-data";
import { HttpService } from "../../providers/http-service";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild('bannerSlide') slides: Slides;
  @ViewChild(Content) content: Content;

  DirectiveTestPage = DirectiveTestPage;
  cityPage = CityPage;
  DetailsPage = DetailsPage;
  SearchPage = SearchPage;
  myHomeSearch: String = '';
  bannerImgs;
  categoryAddetatils;
  handpickDetails;
  showBackTopBtn:Boolean = true;
  
  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    private formBuilder: FormBuilder,

  ) {

    this.getBannerImg();
    this.getCategoryAd();
    this.getHandpickDetails();

  }
  
  getBannerImg() {
    this.httpService.getHomebanner().then(res => {
      console.log(res)
      let self = this;
      this.bannerImgs = res.data;//获取轮播图
      setTimeout(function() {
        self.slides.update();//刷新轮播图
      }, 1000);
    })
  }
  getCategoryAd() {
    this.httpService.getCategoryAd().then(res => {
      console.log(res)
      this.categoryAddetatils = res.data;
    })
  }
  getHandpickDetails() {
    this.httpService.getHandpickDetails().then(res => {
      console.log(res)
      this.handpickDetails = res.data;
    })
  }
  change(){
    
    console.log(this.slides.getActiveIndex())
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  onCancel(event) {

  }

  onInput(event) {

  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  scrollHeight(){
    if(this.content.scrollTop > 400){

      console.log(this.content.scrollTop)
      this.showBackTopBtn = true;
    }else{
      this.showBackTopBtn = false;
    }
  }

}
