import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";

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
import { SignupSecondPage } from '../pages/signup/signup-second/signup-second';
import { SignupThirdPage } from '../pages/signup/signup-third/signup-third';
import { DirectiveTestPage } from "../pages/directive-test/directive-test";
import { ForgotPage } from "../pages/forgot/forgot";
import { ForgotTwoPage } from "../pages/forgot/forgot-two/forgot-two";
import { ForgotThreePage } from "../pages/forgot/forgot-three/forgot-three";
import { CityPage } from '../pages/home/city/city'
import { SearchPage } from '../pages/home/search/search'
import { DetailsPage } from '../pages/home/details/details'


import { UserData } from "../services/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";

import { MyDirective } from "../components/my-directive/my-directive";

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,CityPage,SearchPage,DetailsPage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,SignupSecondPage,SignupThirdPage,
    MyDirective,
    DirectiveTestPage,
    ForgotPage,ForgotTwoPage,ForgotThreePage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      // tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      pageTransition: 'ios-transition'
    }, {
        links: [
          { component: HomePage, name: 'sss', segment: 'home' }
        ]
      }),
    BrowserModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,CityPage,SearchPage,DetailsPage,
    MyPage,
    TabsPage,
    WelcomePage,
    LoginPage,
    SignupPage,SignupSecondPage,SignupThirdPage,
    DirectiveTestPage,
    ForgotPage,ForgotTwoPage
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, Storage, UserData,Native,HttpService]
})
export class AppModule { }
