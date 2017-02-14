import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { TabsPage } from '../pages/tabs/tabs';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, public storage: Storage) {
    // 初次进入app引导页面
    this.storage.get('firstIn').then((result) => { 
        if(result){  
          this.rootPage = LoginPage; 
          this.storage.set('firstIn', false);
        }else{
          this.storage.set('firstIn', true);
          this.rootPage = WelcomePage;
        }
      }
    );
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      Splashscreen.hide();
      StatusBar.overlaysWebView(true); // let status bar overlay webview
      StatusBar.backgroundColorByHexString('#ffffff'); // set status bar to white
    });
  }
}
