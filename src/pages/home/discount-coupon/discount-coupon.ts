import { Component, ViewChild, ElementRef, ViewChildren, QueryList } from '@angular/core';
import { NavController, NavParams, Events, Content } from 'ionic-angular';
import { HttpService } from "../../../providers/http-service";
import { Native } from "../../../providers/native";

/*
  Generated class for the DiscountCoupon page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-discount-coupon',
  templateUrl: 'discount-coupon.html'
})
export class DiscountCouponPage {
  data: any;
  @ViewChildren('myCanvas') myCanvas: QueryList<ElementRef>;
  @ViewChild(Content) content: Content;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public native: Native,
    public events: Events,
    public httpService: HttpService
  ) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DiscountCouponPage');
    this.getCouponData();
  }
  ngAfterViewInit() {
    this.myCanvas.changes.subscribe(data => data._results.forEach(
      (e, i) => {
        let ctx = e.nativeElement.getContext("2d");
        if (this.data) {
          this.timer(ctx, 0, Number(this.data.list[i].baifen.slice(0, -1)), 10);
        }
      }));
    this.myCanvas.notifyOnChanges();
  }
  circle(cxt, percent) {
    var p = (percent * 100).toFixed(0);
    //生成圆形（底圆）
    cxt.fillStyle = "#b8bfe3";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    cxt.arc(30, 30, 30, 0, Math.PI * 2, false);
    cxt.closePath();
    cxt.fill();
    //生成扇形
    cxt.fillStyle = "#ffffff";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    if (percent == 1) {
      cxt.arc(30, 30, 30, 0, Math.PI * 2, false);
    } else if (percent == 0) {
      cxt.arc(30, 30, 30, 0, 0, true);
    } else {
      cxt.arc(30, 30, 30, Math.PI, Math.PI + Math.PI * 2 * percent, false);
    }
    cxt.closePath();
    cxt.fill();
    //生成圆形（上层园）
    cxt.fillStyle = "#7986cb";
    cxt.beginPath();
    cxt.moveTo(30, 30);
    cxt.arc(30, 30, 25, 0, Math.PI * 2, false);
    cxt.closePath();
    cxt.fill();
    //生成中间百分比文字
    cxt.font = "1.6rem arial";
    cxt.fillStyle = "#fff";
    cxt.textAlign = "center";
    cxt.fillText(p + "%", 30, 33);
  }
  timer(id, start, end, interval) {
    setTimeout(() => {
      this.circle(id, start / 100);
      start++;
      if (start < end + 1) {
        this.timer(id, start, end, interval);
      }
    }, interval);
  }
  getCouponData() {
    this.httpService.coupon({page:1}).then((res) => {
      if (res.status == 1) {
        this.data = res;
      }
    })
  }
  getPrivilege(is_get, type_id) {
    if (is_get == 1) {
      this.goClassPage('classify');
    } else if (is_get == 0) {
      this.native.openAlertBox('确认领取优惠券', () => {
        this.httpService.sendByUser({ type_id: type_id }).then((res) => {
          if (res.status == 1) {
            this.native.showToast('领取优惠券成功');
            is_get=1
            this.getCouponData();
          }
        })
      })
    }
  }
  goClassPage(value) {
    this.navCtrl.pop();
    this.navCtrl.parent.select(1);
    this.events.publish('classify:selectSegment', value);
  }

  flag: boolean = true;
  doInfinite(infiniteScroll) {
    if (this.data.page < this.data.pages) {
      this.httpService.coupon({ page: ++this.data.page }).then((res) => {
        if (res.status == 1) {
          Array.prototype.push.apply(this.data.list, res.list);
        }
        setTimeout(() => {
          infiniteScroll.complete();
        }, 500);
      })
    } else {
      this.flag = false;
    }
  }
  scrollToTop() {
    this.content.scrollToTop();
  }
}
// export class Ring {
//   percent: any;
//   startAngle: any;
//   radius = 28;    // 圆环半径
//   lineWidth = 5;  // 圆环边的宽度
//   strokeStyle = '#ccc'; //边的颜色
//   fillStyle = '#fff';  //填充色
//   lineCap = 'round';
//   constructor(startAngle, percent) {
//     this.startAngle = startAngle || 3 * Math.PI / 2; //弧起始角度
//     this.percent = percent
//   }
//   draw = (ctx) => {
//     ctx.beginPath();
//     ctx.arc(30, 45, this.radius, 0, Math.PI * 2, true);  // 坐标为250的圆，这里起始角度是0，结束角度是Math.PI*2
//     ctx.lineWidth = this.lineWidth;
//     ctx.strokeStyle = this.strokeStyle;
//     ctx.stroke();  // 这里用stroke画一个空心圆，想填充颜色的童鞋可以用fill方法
//   };
//   drawRing = (ctx) => {
//     this.draw(ctx);  // 调用Circle的draw方法画圈圈
//     ctx.beginPath();
//     var anglePerSec = 2 * Math.PI / (100 / this.percent); // 蓝色的弧度
//     ctx.arc(35, 45, this.radius, this.startAngle, this.startAngle, false); //这里的圆心坐标要和cirle的保持一致
//     ctx.strokeStyle = this.fillStyle;
//     ctx.lineCap = this.lineCap;
//     ctx.stroke();
//     ctx.closePath();
//   }

// }