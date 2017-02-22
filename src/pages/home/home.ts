import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';
import {FormBuilder} from '@angular/forms';


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
   DirectiveTestPage = DirectiveTestPage;
   cityPage = CityPage;
   DetailsPage = DetailsPage;
   SearchPage = SearchPage;
   myHomeSearch: String = '';
   bannerImgs = [];

  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
    private httpService: HttpService,
    private formBuilder: FormBuilder,

  ) {
    this.events.unsubscribe("user:login");
    this.getBannerImg();
  }

  getBannerImg() {
    this.httpService.getHomebanner().then(res => {
      console.log(res)
      this.bannerImgs = res;
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  onCancel(event) {

  }
  onInput(event) {

  }
}
