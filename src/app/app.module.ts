import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpModule }   from '@angular/http';

import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { MyPage } from '../pages/my/my';
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SignupSecondPage } from '../pages/signup-second/signup-second';

import { UserData } from "../services/user-data";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    SignupSecondPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
    }, {})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,
    SignupSecondPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,UserData]
})
export class AppModule {}
