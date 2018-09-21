import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Native } from "../../providers/native";
import { ActionSheetController, ModalController } from 'ionic-angular';
import { HttpService } from '../../providers/http-service';
import { CameraOptions } from '@ionic-native/camera';
import AlloyCrop from 'alloycrop';
import AlloyFinger from 'alloyFinger';

/**
 * Generated class for the GetImageDirective directive.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/DirectiveMetadata-class.html
 * for more info on Angular Directives.
 */
@Directive({
   selector: '[get-image]' // Attribute selector
})
export class GetImageDirective {

   constructor(
      private native: Native,
      private httpServ: HttpService,
      public actionSheetCtrl: ActionSheetController,
      private modalCtrl: ModalController,

   ) {
      console.log('Hello GetImageDirective Directive');
   }
   @Output('get-image') fileChecked: EventEmitter<any> = new EventEmitter<any>();
   @Input() quality: number;
   @Input('CameraOptions') cameraOptions: CameraOptions = new Object();

   @HostListener('click', ['$event']) onclick(e) {
      if (this.native.isMobile()) {
         e.preventDefault()
         let actionSheet = this.actionSheetCtrl.create({
            buttons: [
               {
                  text: '拍照上传',
                  role: 'destructive',
                  handler: () => {
                     this.native.getPictureByCamera(this.cameraOptions).then((data) => {
                        this.httpServ.GetFileImg({ img: 'data:image/jpg;base64,' + data }).then(res => {
                           if (res.status) {
                              this.fileChecked.emit({
                                 img_http: res.img_http,
                                 img_url: res.img_url,
                                 base64: 'data:image/jpg;base64,' + data
                              });
                           }
                        })
                     })
                  }
               },
               {
                  text: '本地上传',
                  handler: () => {
                     this.native.getPictureByPhotoLibrary(this.cameraOptions).then((data) => {
                        this.httpServ.GetFileImg({ img: 'data:image/jpg;base64,' + data }).then(res => {
                           if (res.status) {
                              this.fileChecked.emit({
                                 img_http: res.img_http,
                                 img_url: res.img_url,
                                 base64: 'data:image/jpg;base64,' + data
                              });
                           }
                        })
                     })
                  }
               },
               {
                  text: '取消',
                  role: 'cancel',
               }
            ]
         });
         actionSheet.present();
      }
   }
   @HostListener('change', ['$event']) onchange(e) {
      if (!e) { return; }
      let file = e.target.files[0];//获取文件
      let imageType = /^image\//;
      e.target.value = null;//选择成功后清空input值
      if (!imageType.test(file.type)) {//判断图片
         this.native.showToast("请选择图片！");
      } else
         if (file.size > (15 * 1024 * 1024)) {
            this.native.showToast("图片超过限制");
         } else {
            let reader = new FileReader();
            reader.onload = (event) => {//读取完成
               let base = event.target['result'];
               if (this.cameraOptions.hasOwnProperty('allowEdit') && this.cameraOptions.allowEdit) {
                  this.modalCtrl.create('AlloycropPage', {
                     img_url: base,
                     callback: (res) => {
                        base = res;
                        this.httpServ.GetFileImg({ img: base }).then(res => {
                           if (res.status) {
                              this.fileChecked.emit({
                                 img_http: res.img_http,
                                 img_url: res.img_url,
                                 base64: base
                              });
                           }
                        })
                     }
                  }, { enterAnimation: 'ios-transition', leaveAnimation: 'ios-transition' }).present();

               } else {
                  // let formData = new FormData();
                  // formData.append('img', file, file.name);
                  this.httpServ.GetFileImg({ img: base }).then(res => {
                     if (res.status) {
                        this.fileChecked.emit({
                           img_http: res.img_http,
                           img_url: res.img_url,
                           base64: base
                        });
                     }
                  })
               }
               /* if (this.quality) console.log('压缩品质:', this.quality);
               this.dealImage(base, (base) => {
                  // console.log("压缩后：" + base.length / 1024 + " ");　
               }, {
                     quality: this.quality
                  }) */
            };
            reader.readAsDataURL(file);
            // console.log(reader, reader.onload, reader.onloadend, reader.readAsDataURL)
         }
   }
   dataURItoBlob(dataURI) {
      let byteString = atob(dataURI.split(',')[1]);
      let mimeString = dataURI.split(',')[0].match(/:(.*?);/)[1];
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
         ia[i] = byteString.charCodeAt(i);
      }
      let blob = new Blob([ia], { type: mimeString });
      return blob;
   }
   dealImage(path: string, callback, obj: { width?: number, height?: number, quality?: number } = {}) {
      let img = new Image();
      img.src = path;
      img.onload = function () {
         // 默认按比例压缩
         let w = img.width,
            h = img.height,
            scale = w / h;
         w = obj.width || w;
         h = obj.height || (w / scale);
         let quality = 0.9;  // 默认图片质量为0.9
         //生成canvas
         let canvas = document.createElement('canvas');
         let ctx = canvas.getContext('2d');
         // 创建属性节点
         let anw = document.createAttribute("width");
         anw.nodeValue = String(w);
         let anh = document.createAttribute("height");
         anh.nodeValue = String(h);
         canvas.setAttributeNode(anw);
         canvas.setAttributeNode(anh);
         ctx.drawImage(img, 0, 0, w, h);
         // 图像质量
         if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
            quality = 0.9;
         }
         // quality值越小，所绘制出的图像越模糊
         let base64 = canvas.toDataURL('image/jpeg', quality);
         // 回调函数返回base64的值
         callback(base64);
      }
   }

}
