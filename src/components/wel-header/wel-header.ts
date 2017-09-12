import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { Content, ModalController, NavController } from 'ionic-angular';

/**
 * Generated class for the WelHeaderComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'wel-header',
  templateUrl: 'wel-header.html'
})
export class WelHeaderComponent {

  @Input() content: Content;


  //头部导航标题
  title = '';
  //底部导航class运动控制属性
  tabanimate: boolean = false;
  //头部导航class运动控制属性
  tabColor: boolean = false;
  old_scrollTop = 0;
  conts = 0;
  constructor(
    public ref: ChangeDetectorRef,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
  ) {
    console.log('Hello WelHeaderComponent Component');
  }


  ngAfterViewInit() {
    console.log(this.content);
    if (!this.content) {
      return
    }
    this.content.ionScroll.subscribe((d) => {
      let scrollTop = d.scrollTop;

      if (scrollTop > 110) {
        this.tabColor = true;
      } else {
        this.tabColor = false;
      }
      this.ref.detectChanges();
      /*  if (scrollTop > 110 && (this.old_scrollTop - scrollTop) < 0) {
         if (!this.tabanimate) {
           this.tabanimate = true;
         }
       } else {
         this.tabanimate = false;
         if (!this.tabColor && scrollTop > 150) {
           this.tabColor = true;
         }
         if (scrollTop <= 150) {
           this.tabColor = false;
         }
       }
       this.old_scrollTop = scrollTop;
       this.ref.detectChanges(); */
    })
  }
  openWelMenu() {
    let modal = this.modalCtrl.create('WelMenuPage');
    modal.onDidDismiss((data) => {
      if (data) data(this.navCtrl);
    })
    modal.present();
  }
}
