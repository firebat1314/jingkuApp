import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SingleCardComponent } from '../../../components/single-card/single-card'

/*
  Generated class for the BrandList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-brand-list',
  templateUrl: 'brand-list.html',
})
export class BrandListPage {
  myHomeSearch: String = '';
  data =  {
          items: [
              {
                  id: 1,
                  title: 'Isaac Raid',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 2,
                  title: 'Jason Graham',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 3,
                  title: 'Abigail Ross',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 4,
                  title: 'Justin Rutherford',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 5,
                  title: 'Nicholas Henderson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 6,
                  title: 'Elizabeth Mackenzie',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 7,
                  title: 'Melanie Ferguson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 8,
                  title: 'Fiona Kelly',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 9,
                  title: 'Nicholas King',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 10,
                  title: 'Victoria Mitchell',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 5,
                  title: 'Nicholas Henderson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 6,
                  title: 'Elizabeth Mackenzie',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 7,
                  title: 'Melanie Ferguson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 8,
                  title: 'Fiona Kelly',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 9,
                  title: 'Nicholas King',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 10,
                  title: 'Victoria Mitchell',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 5,
                  title: 'Nicholas Henderson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 6,
                  title: 'Elizabeth Mackenzie',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 7,
                  title: 'Melanie Ferguson',
                  image: 'assets/icon/homepage_71.png',
                  favorite: false
              },
              {
                  id: 8,
                  title: 'Fiona Kelly',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 9,
                  title: 'Nicholas King',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              },
              {
                  id: 10,
                  title: 'Victoria Mitchell',
                  image: 'assets/icon/homepage_71.png',
                  favorite: true
              }
          ]
      };

  constructor(public navCtrl: NavController, public navParams: NavParams) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad BrandListPage');
  }
  doRefresh(refresher) {
    console.log('Begin async operation', refresher);

    setTimeout(() => {
      console.log('Async operation has ended');
      refresher.complete();
    }, 2000);
  }
}
