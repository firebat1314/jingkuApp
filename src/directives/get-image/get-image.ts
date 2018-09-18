import { Directive, HostListener, Output, EventEmitter, Input } from '@angular/core';
import { Native } from "../../providers/native";
import { ActionSheetController } from 'ionic-angular';

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
        public actionSheetCtrl: ActionSheetController,
    ) {
        console.log('Hello GetImageDirective Directive');
    }
    @Output('get-image') fileChecked: EventEmitter<string> = new EventEmitter<string>();
    @Input() quality: number;
    @Input() CameraOptions: any;

    @HostListener('click', ['$event']) onclick(e) {
        if (this.native.isMobile()) {
            e.preventDefault()
            let actionSheet = this.actionSheetCtrl.create({
                buttons: [
                    {
                        text: '拍照上传',
                        role: 'destructive',
                        handler: () => {
                            this.native.getPictureByCamera(this.CameraOptions).then((data) => {
                                this.fileChecked.emit('data:image/jpg;base64,' + data);
                            })
                        }
                    },
                    {
                        text: '本地上传',
                        handler: () => {
                            this.native.getPictureByPhotoLibrary(this.CameraOptions).then((data) => {
                                this.fileChecked.emit('data:image/jpg;base64,' + data);
                            })
                        }
                    },
                    {
                        text: '取消',
                        role: 'cancel',
                        handler: () => { }
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
        if (!imageType.test(file.type)) {//判断图片
            this.native.showToast("请选择图片！");
            return;
        }
        if (file.size > (10 * 1024 * 1024)) {
            this.native.showToast("图片超过限制");
        } else {
            this.fileChecked.emit(file);

            /* let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {//读取完成
                console.log('压缩品质:', this.quality);
                this.dealImage(event.target['result'], (base) => {
                    // console.log("压缩后：" + base.length / 1024 + " ");　
                    this.fileChecked.emit(base);
                }, {
                        quality: this.quality
                    })
            }; */
            // console.log(reader, reader.onload, reader.onloadend, reader.readAsDataURL)
        }
    }
    //上传 
    /* public submitUploadFile() {
        if (this.fileList.length > 0) {
            let file: File = this.fileList[0];
            let formData = new FormData();
            formData.append('file', file, file.name);
            let headers = new Headers();
            headers.append('Accept', 'application/json');
            let options = new RequestOptions({ headers: headers });
            this.http.post(url, formData, options)
                .map(res => res.json())
                .catch(error => Observable.throw(error))
                .subscribe(

                )
        }
    } */
    dealImage(path: string, callback, obj: { width?: number, height?: number, quality?: number } = {}) {
        let img = new Image();
        img.src = path;
        img.onload = function() {
            // 默认按比例压缩
            let w = img.width,
                h = img.height,
                scale = w / h;
            w = obj.width || w;
            h = obj.height || (w / scale);
            let quality = 0.9;  // 默认图片质量为0.7
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
