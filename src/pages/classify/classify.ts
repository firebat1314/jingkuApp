import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

/*
  Generated class for the Classify page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-classify',
  templateUrl: 'classify.html'
})
export class ClassifyPage {
  classSelect: any = 'classify';

  @ViewChild('mySlides') mySlides: Slides;
  constructor(public navCtrl: NavController, public navParams: NavParams) { 
   
    

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ClassifyPage');
  }
  ngAfterViewInit(){
    
  }
  goToSlide() {
 switch(this.classSelect){
      case 'classify':this.mySlides.slideTo(0);break;
      case 'brand':this.mySlides.slideTo(1);break;
      case 'care':this.mySlides.slideTo(2);
    }
  }
  
  slideChanged() {
    switch(this.mySlides.getActiveIndex()){
      case 0:this.classSelect = 'classify';break;
      case 1:this.classSelect = 'brand';break;
      case 2:this.classSelect = 'care';
    }

  }
}
