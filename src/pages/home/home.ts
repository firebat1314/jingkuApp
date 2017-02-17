import { Component } from '@angular/core';

import { NavController,Events } from 'ionic-angular';

import {DirectiveTestPage} from '../directive-test/directive-test'

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private events:Events
  ) {
    this.events.unsubscribe("user:login")
  }

  toTest(){
    this.navCtrl.push(DirectiveTestPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }
  onCancel(event){
    
  }
  onInput(event){

  }
}
