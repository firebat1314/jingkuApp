import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import AlloyCrop from 'alloycrop';
import AlloyFinger from 'alloyFinger';
import Transform from 'css3transform';

/**
 * Generated class for the AlloycropPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
   selector: 'page-alloycrop',
   templateUrl: 'alloycrop.html',
})
export class AlloycropPage {

   base: WindowBase64 = this.navParams.get('img_url');
   callback: Function = this.navParams.get('callback');
   constructor(public navCtrl: NavController, public navParams: NavParams, private viewCtrl: ViewController) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad AlloycropPage');
      console.log(AlloyCrop.prototype.init)
      AlloyCrop.prototype.crop = function () {
          this.calculateRect();
          this.ctx.drawImage(this.img, this.crop_rect[0], this.crop_rect[1], this.crop_rect[2], this.crop_rect[3], 0, 0, this.canvas.width, this.canvas.height);
          // this.ctx.drawImage(this.img, this.crop_rect[0], this.crop_rect[1], this.crop_rect[2], this.crop_rect[3], 0, 0, this.crop_rect[2]*this.img.scaleX, this.crop_rect[3]*this.img.scaleY);
      },
      AlloyCrop.prototype.init = function () {
         this.img_width = this.img.naturalWidth;
         this.img_height = this.img.naturalHeight;
         Transform(this.img, true);
         var scaling_x = window.innerWidth / this.img_width,
            scaling_y = window.innerHeight / this.img_height;
         var scaling = scaling_x > scaling_y ? scaling_y : scaling_x;
         /*this.initScale = scaling;
         this.originScale = scaling;
         this.img.scaleX = this.img.scaleY = scaling;*/
         this.initScale = scaling_x;
         this.originScale = scaling_x;
         this.img.scaleX = this.img.scaleY = scaling_x;
         this.first = 1;
         var self = this;
         this.alloyFingerList.push(new AlloyFinger(this.croppingBox, {
            multipointStart: function (evt) {
               //reset origin x and y
               var centerX = (evt.touches[0].pageX + evt.touches[1].pageX) / 2;
               var centerY = (evt.touches[0].pageY + evt.touches[1].pageY) / 2;
               var cr = self.img.getBoundingClientRect();
               var img_centerX = cr.left + cr.width / 2;
               var img_centerY = cr.top + cr.height / 2;
               var offX = centerX - img_centerX;
               var offY = centerY - img_centerY;
               var preOriginX = self.img.originX
               var preOriginY = self.img.originY
               self.img.originX = offX / self.img.scaleX;
               self.img.originY = offY / self.img.scaleY;
               //reset translateX and translateY

               self.img.translateX += offX - preOriginX * self.img.scaleX;
               self.img.translateY += offY - preOriginY * self.img.scaleX;


               self.initScale = self.img.scaleX;

            },
            pinch: function (evt) {
               self.img.scaleX = self.img.scaleY = self.initScale * evt.zoom;
            },
            pressMove: function (evt) {
               self.img.translateX += evt.deltaX;
               self.img.translateY += evt.deltaY;
               evt.preventDefault();
            }
         }));

         this.alloyFingerList.push(new AlloyFinger(this.cancel_btn, {
            touchStart: function () {
               self.cancel_btn.style.backgroundColor = '#ffffff';
               self.cancel_btn.style.color = '#3B4152';
            },
            tap: this._cancel.bind(this)
         }));

         this.alloyFingerList.push(new AlloyFinger(this.ok_btn, {
            touchStart: function () {
               self.ok_btn.style.backgroundColor = '#2bcafd';
               self.ok_btn.style.color = '#ffffff';
            },
            tap: this._ok.bind(this)
         }));

         this.alloyFingerList.push(new AlloyFinger(document, {
            touchEnd: function () {
               self.cancel_btn.style.backgroundColor = '#ffffff';
               self.ok_btn.style.backgroundColor = '#2bcafd';
            }
         }));

         this.renderCover();
         this.setStyle();
      }
      let mAlloyCrop = new AlloyCrop({
         image_src: this.base,
         width: 300,
         height: 300,
         output: 1,
         className: 'm-clip-box',
         ok_text: '确定',
         cancel_text: '取消',
         ok: (base64, canvas) => {
            mAlloyCrop.destroy();
            this.viewCtrl.dismiss();
            this.callback && this.callback(base64);
         },
         cancel: () => {
            mAlloyCrop.destroy();
            this.viewCtrl.dismiss();
         }
      });
   }

}
