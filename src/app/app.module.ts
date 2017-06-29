import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { BrowserModule } from "@angular/platform-browser";

import { IonicStorageModule } from '@ionic/storage';
/*————————————————————————————————base页————————————————————————————————*/
import { MyApp } from './app.component';
import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { ClassifyPage } from '../pages/classify/classify';
import { CarPage } from '../pages/car/car';
import { MyPage } from '../pages/my/my';
/*————————————————————————————————start————————————————————————————————*/
import { WelcomePage } from '../pages/welcome/welcome';
import { LoginPage } from '../pages/login/login';
import { SignupPage } from '../pages/signup/signup';
import { SignupSecondPage } from '../pages/signup/signup-second/signup-second';
import { SignupThirdPage } from '../pages/signup/signup-third/signup-third';
import { DirectiveTestPage } from "../pages/directive-test/directive-test";
import { ForgotPage } from "../pages/forgot/forgot";
import { ForgotTwoPage } from "../pages/forgot/forgot-two/forgot-two";
import { ForgotThreePage } from "../pages/forgot/forgot-three/forgot-three";
/*————————————————————————————————home页————————————————————————————————*/
import { HomePage } from '../pages/home/home';
import { CityPage } from '../pages/home/city/city';
import { SearchPage } from '../pages/home/search/search';
import { DetailsPage } from '../pages/home/details/details';
import { BrandListPage } from '../pages/home/brand-list/brand-list';
import { AttentionPage } from '../pages/home/attention/attention';
import { FastbuyPage } from '../pages/home/fastbuy/fastbuy';
import { GlassesDesignPage } from '../pages/home/glasses-design/glasses-design';
import { IntegralstorePage } from '../pages/home/integralstore/integralstore';
import { JifenHistoryPage } from "../pages/home/integralstore/jifen-history/jifen-history";
import { DuihuanDetailsPage } from "../pages/home/integralstore/duihuan-details/duihuan-details";
import { DuihuanDetailsFinishPage } from "../pages/home/integralstore/duihuan-details-finish/duihuan-details-finish";
import { RechargePage } from '../pages/home/recharge/recharge';
import { WhitebarPage } from '../pages/home/whitebar/whitebar';
import { DiscountCouponPage } from '../pages/home/discount-coupon/discount-coupon';
import { MessagePage } from '../pages/home/message/message';
import { MessageDetailsPage } from "../pages/home/message/message-details/message-details";
import { ParticularsPage } from '../pages/home/particulars/particulars';
import { ParticularsModalPage } from '../pages/home/particulars/particulars-modal/particulars-modal';
import { ParticularsModalAttrPage } from "../pages/home/particulars/particulars-modal-attr/particulars-modal-attr";
import { PresellPage } from "../pages/my/presell/presell";

import { DredgeMoreCityPage } from '../pages/home/particulars/dredge-more-city/dredge-more-city';
import { PopoverContentPage } from "../pages/home/particulars/dredge-more-city/popover-content/popover-content";

import { ParticularsHomePage } from '../pages/particulars-home/particulars-home';
import { ParticularsHomeDetailsPage } from '../pages/particulars-home-details/particulars-home-details';
/*————————————————————————————————分类页————————————————————————————————*/
import { SubnavPage1Page } from '../pages/classify/subnav-page1/subnav-page1';
import { SubnavPage2Page } from '../pages/classify/subnav-page2/subnav-page2';
import { MoreBrandPage } from "../pages/classify/more-brand/more-brand";
/*————————————————————————————————购物车页————————————————————————————————*/

/*————————————————————————————————用户中心————————————————————————————————*/
/*-----------用户管理----------*/
import { AccountManagementPage } from "../pages/my/account-management/account-management";
import { ShippingAddressPage } from "../pages/my/account-management/shipping-address/shipping-address";
import { AccountInfoPage } from "../pages/my/account-management/account-info/account-info";
import { AddressPage } from "../pages/my/account-management/account-info/address/address";
import { MemberCenterPage } from "../pages/my/account-management/member-center/member-center";
import { AccountSecurityPage } from "../pages/my/account-management/account-security/account-security";
import { ChangePhoneNumberPage } from "../pages/my/account-management/account-security/change-phone-number/change-phone-number";
import { ChangePasswordPage } from "../pages/my/account-management/account-security/change-password/change-password";
import { RealnamePage } from "../pages/my/account-management/account-info/realname/realname";
import { QqPage } from "../pages/my/account-management/account-info/qq/qq";
import { AddShippingAddressPage } from "../pages/my/account-management/add-shipping-address/add-shipping-address";
/*---------------------*/
import { SettingPage } from "../pages/my/setting/setting";
import { AllOrdersPage } from "../pages/my/all-orders/all-orders";
import { CouponPage } from "../pages/my/coupon/coupon";
import { PeceiptPage } from "../pages/my/peceipt/peceipt";
import { AccountAssetPage } from "../pages/my/account-asset/account-asset";
import { AccountHelperPage } from "../pages/my/account-helper/account-helper";
import { HelperDetailsPage } from "../pages/my/account-helper/helper-details/helper-details";
import { AccountServicePage } from "../pages/my/account-service/account-service";
import { AccountHistoryPage } from "../pages/my/account-history/account-history";
import { AccountCollectStorePage } from "../pages/my/account-collect-store/account-collect-store";
import { AccountCollectGoodsPage } from "../pages/my/account-collect-goods/account-collect-goods";
import { AccountAreaApplicationPage } from "../pages/my/account-area-application/account-area-application";
import { AccountProcessPage } from "../pages/my/account-process/account-process";
import { AccountJifenPage } from "../pages/my/account-jifen/account-jifen";
import { AccountBalancePage } from "../pages/my/account-balance/account-balance";
import { AccountWithdrawPage } from "../pages/my/account-withdraw/account-withdraw";
import { AccountWithdrawSucceedPage } from "../pages/my/account-withdraw-succeed/account-withdraw-succeed";
import { AccountMoneyDetailPage } from "../pages/my/account-money-detail/account-money-detail";
import { PaymentMethodPage } from "../pages/my/all-orders/payment-method/payment-method";
import { OrdersDetailPage } from "../pages/my/all-orders/orders-detail/orders-detail";
import { WriteOrdersPage } from "../pages/my/all-orders/write-orders/write-orders";
import { OrderModalShippingPage } from "../pages/my/all-orders/write-orders/order-modal-shipping/order-modal-shipping";
import { OrderModalDistributionPage } from "../pages/my/all-orders/write-orders/order-modal-distribution/order-modal-distribution";
import { OrderModalCouponPage } from "../pages/my/all-orders/write-orders/order-modal-coupon/order-modal-coupon";
import { OrderModalPaymentPage } from "../pages/my/all-orders/write-orders/order-modal-payment/order-modal-payment";

import { InvoiceQualificationPage } from "../pages/my/peceipt/invoice-qualification/invoice-qualification";
import { InvoiceAskFor2Page } from "../pages/my/peceipt/invoice-ask-for2/invoice-ask-for2";
import { InvoiceAskFor1Page } from "../pages/my/peceipt/invoice-ask-for1/invoice-ask-for1";
import { AboutUsPage } from "../pages/my/setting/about-us/about-us";
/*————————————————————————————————服务————————————————————————————————*/
import { UserData } from "../providers/user-data";
import { Native } from "../providers/native";
import { HttpService } from "../providers/http-service";
import { JpushService } from "../providers/jpush-service";
/*————————————————————————————————指令————————————————————————————————*/
import { MyDirective } from "../components/my-directive/my-directive";
import { ParallaxHeader } from "../components/parallax-header/parallax-header";
import { ImgTabs } from "../components/img-tabs/img-tabs";
/*————————————————————————————————组件————————————————————————————————*/
import { SingleCardComponent } from '../components/single-card/single-card';
import { MyToolbarComponent } from '../components/my-toolbar/my-toolbar';
import { SingleFoodsItemComponent } from '../components/single-foods-item/single-foods-item';
import { MeunItemComponent } from '../components/meun-item/meun-item';
import { CountdownComponent } from '../components/countdown/countdown';
import { CountInputComponent } from '../components/count-input/count-input';
import { ImgTabs2Component } from "../components/img-tabs2/img-tabs2";
import { CompanynamePage } from "../pages/my/account-management/account-info/companyname/companyname";
import { PhoneNumberFilter } from "../pipes/phone-number-filter";
import { NothingComponent } from "../components/nothing/nothing";
/*————————————————————————————————corodva————————————————————————————————*/
import { ImagePicker } from "@ionic-native/image-picker";
import { CallNumber } from '@ionic-native/call-number';
import { Camera } from '@ionic-native/camera';
import { Toast } from '@ionic-native/toast';
import { AppVersion } from '@ionic-native/app-version';
import { SplashScreen } from "@ionic-native/splash-screen";
import { StatusBar } from "@ionic-native/status-bar";
import { BarcodeScanner } from "@ionic-native/barcode-scanner";
/*————————————————————————————————插件————————————————————————————————*/
import { CityPickerModule } from "ionic2-city-picker/dist/city-picker.module";
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { ImgLazyLoadDirective } from '../directives/img-lazy-load/img-lazy-load';
import { ImgLazyLoadComponent } from "../components/img-lazy-load/img-lazy-load";
import { AdsClickDirective } from '../directives/ads-click/ads-click';
import { ViewfabDirective } from '../directives/viewfab/viewfab';
// import { PopoverHomePage } from "../pages/home/popover-home/popover-home";

@NgModule({
  declarations: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    ForgotPage, ForgotTwoPage, ForgotThreePage,
    TabsPage,
    /*——————————————————购物车——————————————————*/
    CarPage,
    /*——————————————————home栏——————————————————*/
    HomePage,ParticularsHomePage,ParticularsHomeDetailsPage,
    CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage, WhitebarPage, DiscountCouponPage, MessagePage, ParticularsPage, ParticularsModalPage, DredgeMoreCityPage, PopoverContentPage, ParticularsModalAttrPage, MessageDetailsPage, PresellPage, JifenHistoryPage, DuihuanDetailsPage, DuihuanDetailsFinishPage,
    /*——————————————————分类栏——————————————————*/
    ClassifyPage, SubnavPage1Page, SubnavPage2Page, MoreBrandPage,
    /*——————————————————我的栏——————————————————*/
    MyPage, SettingPage, AccountManagementPage, AccountSecurityPage, AllOrdersPage, CouponPage, MemberCenterPage, PeceiptPage, AccountAssetPage, AccountProcessPage, AccountAreaApplicationPage, AccountCollectGoodsPage, AccountCollectStorePage, AccountHistoryPage, AccountServicePage, AccountHelperPage, AccountInfoPage, InvoiceQualificationPage, InvoiceAskFor2Page, InvoiceAskFor1Page, AboutUsPage, ShippingAddressPage, ChangePhoneNumberPage, ChangePasswordPage, RealnamePage, QqPage, AddShippingAddressPage, CompanynamePage, AccountJifenPage, AccountBalancePage, AccountWithdrawPage, AccountMoneyDetailPage, AccountWithdrawSucceedPage, PaymentMethodPage, OrdersDetailPage, WriteOrdersPage, OrderModalShippingPage, OrderModalDistributionPage, OrderModalCouponPage, OrderModalPaymentPage, AddressPage, HelperDetailsPage,
    /*——————————————————组件——————————————————*/
    SingleCardComponent, MyToolbarComponent, SingleFoodsItemComponent, MeunItemComponent, CountdownComponent, CountInputComponent, ImgTabs2Component, NothingComponent,
    DirectiveTestPage,
    /*——————————————————指令——————————————————*/
    MyDirective, ImgTabs, ParallaxHeader,
    /*——————————————————过滤器——————————————————*/
    PhoneNumberFilter,
    ImgLazyLoadComponent,
    ImgLazyLoadDirective,
    AdsClickDirective,
    ViewfabDirective,
  ],
  imports: [
    IonicImageViewerModule,
    IonicModule.forRoot(MyApp, {
      backButtonText: '',
      // mode:'md',
      tabsHideOnSubPages: true,
      tabsPlacement: 'bottom',
      activator: "highlight"
    }),
    IonicStorageModule.forRoot(),
    HttpModule,
    BrowserModule,
    CityPickerModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WelcomePage,
    LoginPage,
    SignupPage, SignupSecondPage, SignupThirdPage,
    ForgotPage, ForgotTwoPage, ForgotThreePage,
    TabsPage,
    /*——————————————————购物车——————————————————*/
    CarPage,
    /*——————————————————home栏——————————————————*/
     HomePage,ParticularsHomePage,ParticularsHomeDetailsPage,
    CityPage, SearchPage, DetailsPage, BrandListPage, AttentionPage, FastbuyPage, GlassesDesignPage, IntegralstorePage, RechargePage, WhitebarPage, DiscountCouponPage, MessagePage, ParticularsPage, ParticularsModalPage, DredgeMoreCityPage, PopoverContentPage, ParticularsModalAttrPage, MessageDetailsPage, PresellPage, JifenHistoryPage, DuihuanDetailsPage, DuihuanDetailsFinishPage,
    /*——————————————————分类栏——————————————————*/
    ClassifyPage, SubnavPage1Page, SubnavPage2Page, MoreBrandPage,
    /*——————————————————我的栏——————————————————*/
    MyPage, SettingPage, AccountManagementPage, AccountSecurityPage, AllOrdersPage, CouponPage, MemberCenterPage, PeceiptPage, AccountAssetPage, AccountProcessPage, AccountAreaApplicationPage, AccountCollectGoodsPage, AccountCollectStorePage, AccountHistoryPage, AccountServicePage, AccountHelperPage, AccountInfoPage, InvoiceQualificationPage, InvoiceAskFor2Page, InvoiceAskFor1Page, AboutUsPage, ShippingAddressPage, ChangePhoneNumberPage, ChangePasswordPage, RealnamePage, QqPage, AddShippingAddressPage, CompanynamePage, AccountJifenPage, AccountWithdrawPage, AccountBalancePage, AccountMoneyDetailPage, AccountWithdrawSucceedPage, PaymentMethodPage, OrdersDetailPage, WriteOrdersPage, OrderModalShippingPage, OrderModalDistributionPage, OrderModalCouponPage, OrderModalPaymentPage, AddressPage, HelperDetailsPage,
    /*——————————————————组件——————————————————*/
    SingleCardComponent, MyToolbarComponent, SingleFoodsItemComponent, MeunItemComponent, CountdownComponent, CountInputComponent, ImgTabs2Component, NothingComponent,
    DirectiveTestPage,
  ],
  providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, UserData, Native, HttpService, JpushService, Camera, ImagePicker, AppVersion, Toast, CallNumber, StatusBar, SplashScreen,BarcodeScanner]
})
export class AppModule { }
