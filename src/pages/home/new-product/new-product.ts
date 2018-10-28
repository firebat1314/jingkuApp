import { Component, ElementRef, Renderer } from '@angular/core';
import { NavController, NavParams, IonicPage } from 'ionic-angular';
import { HttpService } from '../../../providers/http-service';
import { MineProvider } from '../../../providers/mine/mine';
import { AdsClickDirective } from '../../../directives/ads-click/ads-click';

/**
 * Generated class for the NewProductPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
   selector: 'page-new-product',
   templateUrl: 'new-product.html',
   providers: [AdsClickDirective]
})
export class NewProductPage {

   data: any;
   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private httpSrv: HttpService,
      public mine: MineProvider,
      private el: ElementRef,
      private render: Renderer,
      private adsClick: AdsClickDirective,
   ) {
   }

   ionViewDidLoad() {
      console.log('ionViewDidLoad NewProductPage');
   }
   ngOnInit() {
      this.httpSrv.newArea().then(res => {
         this.data = res;

         setTimeout(() => {
            (function (e) {

               var box = e.el.nativeElement.querySelector(".brand_list");
               var ul = box.children[0];
               var lis = ul.children;
               var between = 6;

               var width = box.offsetWidth / lis.length - between;//初始每个图片宽度

               /* for (let i = 0; i < lis.length; i++) {
                  animate(lis[i], { "width": Math.floor(width) });
               } */
               for (var j = 0; j < lis.length; j++) {
                  animate(lis[j], { "width": Math.floor((box.offsetWidth - lis[j].getElementsByTagName('img')[0].width) / (lis.length - 1)) - between });
               }
               var imgWidth = lis[0].getElementsByTagName('img')[0].width;
               animate(lis[0], { "width": Math.floor(imgWidth) });

               //循环遍历 lis 绑定背景图
               for (let i = 0; i < lis.length; i++) {
                  // lis[i].style.backgroundImage = "url(images/" + (i + 1) + ".jpg)";

                  //给每一个li注册鼠标经过事件 鼠标经过后要排他

                  lis[i].onmouseover = function () {
                     var img = this.getElementsByTagName('img')[0];
                     //干掉所有人 让所有人的宽度 渐渐地 变为100
                     /*if (width > img.width) {
                        return
                     } */

                     for (let j = 0; j < lis.length; j++) {
                        animate(lis[j], { "width": Math.floor((box.offsetWidth - img.width) / (lis.length - 1)) - between },function(){
                           lis[j].onclick = null;
                        });
                     }

                     //留下我自己 让我的宽度 渐渐地 变为800

                     animate(this, { "width": Math.floor(img.width) },function(){
                        lis[i].onclick = function () {
                           e.adsClick.data = res.new_goods[i];
                           e.adsClick.onClick();
                        }
                     });
                  };
               }

               //鼠标离开box 所有的li宽度 渐渐地 变为240

               /* box.onmouseout = function () {
                  for (var i = 0; i < lis.length; i++) {
                     animate(lis[i], { "width": Math.floor(width) });
                  }
               }; */
               function animate(obj, json, done?) {
                  clearInterval(obj.timer);
                  obj.timer = setInterval(function () {

                     //先假设 这一次执行完 所有的属性都到达目标了

                     var flag = true;
                     for (var k in json) {
                        var leader = parseInt(getStyle(obj, k)) || 0;
                        var target = json[k];
                        var step = (target - leader) / 10;
                        step = step > 0 ? Math.ceil(step) : Math.floor(step);
                        leader = leader + step;
                        obj.style[k] = leader + "px";
                        //if (leader === target) {
                        //    clearInterval(obj.timer);
                        //}
                        // console.log("代码还在运行");

                        if (leader != target) {

                           flag = false;//告诉标记 当前这个属性还没到达

                        } else {
                           done ? done() : null;
                        }
                     }

                     //如果此时仍然为true 就说明真的都到达了

                     if (flag) {
                        clearInterval(obj.timer);
                     }
                  }, 15);
               }

               //全部属性都到达目标值才能清空

               function getStyle(obj, attr) {
                  if (window.getComputedStyle) {
                     return window.getComputedStyle(obj, null)[attr];
                  } else {
                     return obj.currentStyle[attr];
                  }
               }
            })(this)

         }, 500);
      })
   }
}
