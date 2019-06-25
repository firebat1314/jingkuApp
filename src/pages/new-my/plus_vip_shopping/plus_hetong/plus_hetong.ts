import { Component, ViewChild, ElementRef,OnInit,Renderer2, } from '@angular/core';
import { NavController, ModalController, ViewController, Events, IonicPage, App, Content } from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';
import { Native } from '../../../providers/native';
import { HttpService } from '../../../providers/http-service';
import { CustomeServicesProvider } from '../../../providers/custome-services/custome-services';
import { ChatProvider } from '../../../providers/chat/chat';
import { XimuProvider } from '../../../providers/ximu/ximu';
import { MineProvider } from '../../../providers/mine/mine';
@IonicPage()
@Component({
   selector: ' page-plushetong',
   templateUrl: 'plus_hetong.html'
})
export class plushetongPage {
 
   constructor(  private renderer2: Renderer2,public viewCtrl: ViewController, public navCtrl: NavController, public modalCtrl: ModalController, ) {
   }
 
 
   ngOnInit() {
   
   }
  
}
