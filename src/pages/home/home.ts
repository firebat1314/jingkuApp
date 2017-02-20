import { Component } from '@angular/core';

import { NavController, Events } from 'ionic-angular';

import { DirectiveTestPage } from '../directive-test/directive-test'
import { CityPage } from './city/city'
import { SearchPage } from './search/search'
import { DetailsPage } from './details/details'

import { UserData } from "../../services/user-data";


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public DirectiveTestPage = DirectiveTestPage;
  public cityPage = CityPage;
  public DetailsPage = DetailsPage;
  public SearchPage = SearchPage;
  public myHomeSearch: String = '';
  constructor(
    public navCtrl: NavController,
    private userData: UserData,
    private events: Events,
  ) {
    this.events.unsubscribe("user:login");
    this.getBannerImg();
  }

  getBannerImg(){
    this.userData.httpGetWithAuth().then(res => {
      console.log(res)
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
