import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { HttpModule }   from '@angular/http';
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
import { SignupSecondPage } from '../pages/signup-second/signup-second';
import { SignupThirdPage } from '../pages/signup-third/signup-third';
import {DirectiveTestPage} from "../pages/directive-test/directive-test";

import { UserData } from "../services/user-data";

import { MyDirective } from "../components/my-directive/my-directive";

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
    SignupSecondPage,
    SignupThirdPage,
    MyDirective,
    DirectiveTestPage
  ],
  imports: [
    IonicModule.forRoot(MyApp,{
      backButtonText: '',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
    }),
    BrowserModule
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
    SignupSecondPage,
    SignupThirdPage,
    DirectiveTestPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Storage,UserData]
})
export class AppModule {}
