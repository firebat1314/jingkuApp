import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, Events, IonicPage, AlertController, ModalController } from 'ionic-angular';
import { HttpService } from "../../../../providers/http-service";
import { Native } from "../../../../providers/native";
import { MineProvider } from '../../../../providers/mine/mine';

export class goodsSpectaclesParams {
   number = 1;//所填写的商品的数量
   spc = [];//商品选择的属性
   qiujing = '';//所选的球镜
   zhujing = '';//所选的柱镜
   zhouwei = '';//所填写的轴位
   price = '0.00';
   subtotal= '0.00';
}

@IonicPage()
@Component({
   selector: 'page-particulars-modal-attr',
   templateUrl: 'particulars-modal-attr.html',
})
export class ParticularsModalAttrPage {
   // isLjdz: any;//来镜定制
   goodsId: any = this.navParams.get('id');
   cutId: any = this.navParams.get('cutId');
   dId: any = this.navParams.get('dId');
   headData: any = this.navParams.get('headData');
   callback: any = this.navParams.get('callback');
   isActivity = this.navParams.get('isActivity');//是否为活动商品

   /* 扫描选择镜架商品 */
   scannerId = this.navParams.get('scannerId');//二维码扫描id
   scannerIndex = this.navParams.get('scannerIndex');//加工单下标
   sn: any = this.navParams.get('sn');
   scannerData: any;
   scanner_select;

   distributionInfo: any;
   cutting_info: any;
   goods_attribute: any;
   type: any;//goods_spectacles||goods||cut

   /*goods 普通商品参数*/
   attrIds: Array<any> = [];
   attrNumbers: Array<any> = [];
   /*goods_spectacles 镜片商品参数*/
   memberArr: Array<any> = [];
   spcArr: Array<any> = [];
   qiujingArr: Array<any> = [];
   zhujingArr: Array<any> = [];
   zhouweiArr: Array<any> = [];

   qiujing: string;
   /*自定义镜片信息(添加、删除)*/
   goods: Array<any> = new Array(new goodsSpectaclesParams);

   /* 护理液主属性 */
   mainAttrs: any;
   mainAttr;
   /* 护理液主属性id */
   checkMainAttrId: any;
   /* 护理液主属性数量/瓶 */
   checkMainAttrNum: any = 1;
   checkMainAttrLabel: any;
   /* 属性列表 */
   attrsList: any;
   /* 默认选中切边 */
   checkCutGoodsId;

   /* 价格数量计算 */
   totalPrices: any = 0;
   totalNumber: any = 0;
   goodsInfo: any;
   hasZuoyou: any;//定制片是否包含左右属性没有则显示左右标题

   constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      public viewCtrl: ViewController,
      public httpServ: HttpService,
      public native: Native,
      private events: Events,
      private alertCtrl: AlertController,
      private mine: MineProvider,
      private modalCtrl: ModalController,
   ) {
   }
   ionViewDidLoad() {
      console.log('ionViewDidLoad ParticularsModalAttrPage');
   }
   ngOnInit() {
      if (this.scannerId) {
         this.httpServ.SpecialMachiningGoodsInfo({ id: this.scannerId }, { showLoading: false }).then(res => {
            this.goodsId = res.info.goods_id;
            this.type = 'cut';
            this.scannerData = res;
            this.getGoodInfo();
            if (res.is_jingjia > 0) {
               this.getAttrList();
            } else {
               this.getGoodsAttribute(this.goodsId);
            }
         })
      } else if (this.cutId > 0) {
         this.checkCutGoodsId = this.goodsId;
         this.httpServ.cutting_info({ id: this.cutId }).then(res => {
            if (res.status) {
               this.type = 'cut';
               this.cutting_info = res;
               // this.goodsId = res.cutting_info.goods_id;
               this.getGoodInfo();
               this.getAttrList();
            }
         })
      } else if (this.dId > 0) {
         this.httpServ.info_d({ id: this.dId }).then(res => {
            if (res.status) {
               this.distributionInfo = res;
               this.goodsId = res.info.goods_id;
               this.getGoodInfo();
               this.getGoodsAttribute(this.goodsId);
            }
         })
      } else {
         this.getGoodInfo();
         this.getGoodsAttribute(this.goodsId);
      }
   }
   getGoodInfo() {
      this.httpServ.goodsInfos({ goods_id: this.goodsId }).then((res) => {
         if (res.status == 1) {
            this.goodsInfo = res;
            this.headData = res.data;
         }
      })
   }
   /* 获取镜片球镜属性 */
   getGoodsAttribute(goods_id) {
      this.goods_attribute = null;
      if (this.cutId > 0) {
         this.httpServ.get_goods_attribute({ goods_id: goods_id }).then((res) => {
            if (res.status == 1) {
               this.type = res.goods_type;
               this.goods_attribute = res;
               this.goods = [{
                  number: 1,
                  spc: [],
                  qiujing: '',
                  zhujing: '',
                  zhouwei: '',
                  price: '0.00',
                  subtotal: '0.00',
                  '定制类型': '',
                  label: "右眼"
               }, {
                  number: 1,
                  spc: [],
                  qiujing: '',
                  zhujing: '',
                  zhouwei: '',
                  price: '0.00',
                  subtotal: '0.00',
                  '定制类型': '',
                  label: "左眼"
               }]

               for (let i = 0; i < res.specification.length; i++) {//禁用左右下拉
                  const attr = res.specification[i];
                  if (attr.name.indexOf('左/右') > -1) {
                     attr.disable = true;
                     this.hasZuoyou = true;
                     for (let i = 0; i < attr.values.length; i++) {
                        const id = attr.values[i].id;
                        this.goods[i]['左/右'] = id;
                     }
                  }
               }
            }
         })
      } else if (this.dId > 0) {
         this.httpServ.get_goods_attribute_d({ goods_id: goods_id, id: this.dId }, { showLoading: false }).then((res) => {
            if (res.status == 1) {
               this.type = res.goods_type;
               this.goods_attribute = res;
               if (this.goods_attribute.goods_type == 'goods') {
                  for (var i in this.goods_attribute.data) {
                     if (this.goods_attribute.data[i].is_main == 1) {
                        this.mainAttrs = this.goods_attribute.data[i];
                        console.log(this.mainAttrs)
                        this.checkMainAttrId = this.goods_attribute.data[i].values[0].id || null;
                        this.checkMainAttrNum = this.goods_attribute.data[i].values[0].number || 1;
                        this.checkMainAttrLabel = this.goods_attribute.data[i].values[0].label || '';
                     }
                  }
                  this.getAttrList();
               }
            }
         })
      } else {
         this.httpServ.getGoodsAttribute({ goods_id: goods_id, isActivity: this.isActivity }).then((res) => {
            if (res.status == 1) {
               this.type = res.goods_type;
               this.goods_attribute = res;
               if (this.goods_attribute.goods_type == 'goods') {
                  for (var i in this.goods_attribute.data) {
                     if (this.goods_attribute.data[i].is_main == 1) {
                        this.mainAttrs = this.goods_attribute.data[i];
                        console.log(this.mainAttrs)
                        this.checkMainAttrId = this.goods_attribute.data[i].values[0].id || null;
                        this.checkMainAttrNum = this.goods_attribute.data[i].values[0].number || 1;
                        this.checkMainAttrLabel = this.goods_attribute.data[i].values[0].label || '';
                     }
                  }
                  this.getAttrList();
               }
            }
         })
      }
   }
   /* 获取普通商品属性 */
   getAttrList() {
      //默认选中商品主属性的属性值
      if (this.dId > 0) {
         this.httpServ.get_attr_list_d({ goods_id: this.goodsId, attr: this.checkMainAttrId, id: this.dId }).then((res) => {
            this.attrsList = res;
         })
      } else {
         this.httpServ.getAttrList({ goods_id: this.goodsId, attr: this.checkMainAttrId, isActivity: this.isActivity, sn: this.scannerId > 0 ? this.sn : null }).then((res) => {
            this.attrsList = res;
            if(this.scannerId>0){
               try {
                  this.scanner_select = res.data[0];
                  this.scannerSelectChange(this.scanner_select);
               } catch (e) { }
            }
         })
      }
   }
   checkMainAttr(item) {
      this.attrsList = null;
      this.checkMainAttrId = item.id;
      this.checkMainAttrNum = item.number || 1;
      this.checkMainAttrLabel = item.label || '';
      this.clear();
      this.getAttrList();
   }
   checklinkedGoods(goods) {
      // this.callback.navCtrl.push('ParticularsPage',{goodsId:goods.goods_id});
      this.viewCtrl.dismiss((navCtrl) => {
         navCtrl.push('ParticularsPage', { goodsId: goods.goods_id });
      });
   }
   clear() {
      this.attrIds = [];
      this.attrNumbers = [];
      this.numberIChange()
   }
   clearJp() {
      this.totalNumber = 0;
      this.totalPrices = 0;
   }
   /*关闭modal弹出*/
   dismiss(data?: any) {
      this.viewCtrl.dismiss(data || null);
   }
   /* 数量改变 */
   numberIChange(item?) {
      if (item) {
         var index = this.attrIds.indexOf(item.goods_attr_id);
         if (index == -1) {
            this.attrIds.push(item.goods_attr_id);
            this.attrNumbers.push(item.goods_attr_number);
         } else if (item.goods_attr_number == 0) {
            this.attrIds.splice(index, 1);
            this.attrNumbers.splice(index, 1);
         } else {
            this.attrNumbers[index] = item.goods_attr_number;
         }
      }
      this.httpServ.changeGoodsNumber({
         goods_id: this.goodsId,
         goods: {
            spec: this.attrIds,
            member: this.attrNumbers
         }
      }).then((res) => {
         if (res.status == 1) {
            this.totalNumber = res.number;
            this.totalPrices = res.goods_total;
         }
      })
   }
   scannerSelectChange(item) {
      this.scanner_select = item;
      this.httpServ.changeGoodsNumber({
         goods_id: this.goodsId,
         goods: {
            spec: [item.goods_attr_id],
            member: [1]
         }
      }).then((res) => {
         if (res.status == 1) {
            this.totalNumber = res.number;
            this.totalPrices = res.goods_total;
         }
      })
   }
   /*镜片商品添加删除 项目*/
   increasedJP() {
      if (!this.goods[this.goods.length - 1].zhujing) {
         this.native.showToast('球镜与柱镜不能为空')
         return;
      } else {
         this.goods.push(new goodsSpectaclesParams);
      }
   }
   removeJPByIndex(e, index) {
      e.stopPropagation();
      if (!this.goods[index].qiujing && !this.goods[index].zhujing) {
         this.goods.splice(index, 1);
      } else {
         if (this.goods.length > 1) {
            this.native.openAlertBox('确认删除', () => {
               this.goods.splice(index, 1);
            });
         } else {
            this.native.showToast('请保留至少一个商品');
         }
      }
   }
   /*根据球镜选择柱镜*/
   qiujingChange(item) {
      this.httpServ.getZhujing({
         item: item.qiujing,
         goods_id: this.checkCutGoodsId || this.goodsId
      }).then((res) => {
         // console.log('镜柱属性：', res)
         if (res.status == 1) {
            item.zhujing = null;
            item.getZhujingList = res;
         }
         this.attrChange(item);
      })
   }
   attrChange(item) {
      var spcArr = [];
      for (var j = 0, items = this.goods_attribute.specification; j < items.length; j++) {
         if (items[j].name.indexOf('定制类型') > -1) {//左右眼镜片定制类型同步设置
            for (let i = 0; i < this.goods.length; i++) {
               this.goods[i][items[j].name] = item[items[j].name];
            }
         }
         var attr = item[items[j].name];
         if (attr) spcArr.push(item[items[j].name]);
      }
      this.httpServ.changeprice({
         goods_id: this.checkCutGoodsId || this.goodsId,
         attr: spcArr,
         qiujing: item.qiujing,
         zhujing: item.zhujing
      }).then((res) => {
         if (res.status) {
            if (res.data.is_users_child === 1) {//隐藏价格
               item.price = '¥--';
            } else {
               if (res.data.promotion_id > 0) {
                  item.price = res.data.promotion_price.substr(1);
                  item.youhui = (res.data.price - (res.data.promotion_price.substr(1))).toFixed(2);
               } else {
                  item.price = res.data.price.toFixed(2);
               }
               this.jingpianNumberChange(item);
            }
         }
      })
   }
   jingpianNumberChange(it) {
      // console.log(it)
      it.subtotal = (Number(it.number) * (Number(it.price) * 10000)) / 10000;
      this.totalPrices = 0;
      this.totalNumber = 0;
      for (var i = 0; i < this.goods.length; i++) {
         this.totalNumber += Number(this.goods[i].number);
         this.totalPrices += Number(this.goods[i].subtotal);
      }
   }
   /*镜片商品参数*/
   getGoodsParamsArrs() {
      this.memberArr = [];
      this.qiujingArr = [];
      this.zhujingArr = [];
      this.zhouweiArr = [];
      this.spcArr = [];
      for (let i = 0; i < this.goods.length; i++) {
         this.memberArr.push(this.goods[i].number);
         this.qiujingArr.push(this.goods[i].qiujing);
         this.zhujingArr.push(this.goods[i].zhujing);
         this.zhouweiArr.push(this.goods[i].zhouwei);
         this.spcArr.push([]);
         for (var j = 0; j < this.goods_attribute.specification.length; j++) {
            var attr = this.goods[i][this.goods_attribute.specification[j].name];
            if (attr) {
               this.spcArr[i].push(this.goods[i][this.goods_attribute.specification[j].name])
            }
         }
      }
      for (let i = 0; i < this.goods.length; i++) {
         if (!this.goods[i].zhujing) {
            this.native.showToast('球镜与柱镜不能为空', null, false);
            return false
         }
      }

      for (let i = 0; i < this.memberArr.length; i++) {
         if (!(this.memberArr[i] > 0)) {
            this.native.showToast('请添加商品数量', null, false)
            return false
         }
      }
      return true
   }
   /*添加到购物车*/
   addToCart(goCart) {
      /*普通商品添加到购物车*/
      if (this.type == 'goods') {//除镜片商品
			/* if(this.attrNumbers.length==1&&this.attrNumbers[0]==0){
				this.native.showToast('请至少选择一件商品',null,false)
				return;
			} */
         if (this.attrNumbers.length == 0) {
            this.native.showToast('请添加商品数量', null, false)
            return;
         }
         this.httpServ.addToCartSpec({
            goods_id: this.goodsId,
            goods: { member: this.attrNumbers, spec: this.attrIds }
         }).then((res) => {
            if (res && res.status == 1) {
               this.native.showToast('添加成功')
               this.events.publish('car:update');//更新购物车
               this.viewCtrl.dismiss(goCart);
            } else if (res.status == -2) {
               this.alertCtrl.create({
                  title: '镜库科技',
                  message: '购买需上传医疗器械许可证，是否上传',
                  buttons: [
                     {
                        text: '确定',
                        handler: () => {
                           this.viewCtrl.dismiss((navCtrl) => {
                              navCtrl.push('AccountInfoPage', { dId: this.dId })
                           });
                        }
                     },
                     {
                        text: '取消',
                     }
                  ]
               }).present();
            }
         }).catch((res) => {
            console.log(res)
         })
      }
      /*镜片商品添加到购物车*/
      if (this.type == 'goods_spectacles' && !(this.cutId > 0)) {
         // this.viewCtrl.dismiss();
         if (this.getGoodsParamsArrs()) {
            const joinCar = (callback) => {
               this.httpServ.addToCartSpecJp({
                  goods_id: this.goodsId,
                  goods: {
                     member: this.memberArr,//所填写的商品的数量
                     spc: this.spcArr,//商品选择的属性
                     qiujing: this.qiujingArr,//所选的球镜
                     zhujing: this.zhujingArr,//所选的柱镜
                     zhouwei: this.zhouweiArr//所填写的轴位
                  }
               }, { showLoading: true, showToast: true }).then((res) => {
                  callback(res)
               }).catch((res) => {
                  console.log(res)
               })
            }
            joinCar((res) => {
               if (res && res.status == 1) {
                  this.native.showToast('添加成功')
                  this.events.publish('car:update');//更新购物车
                  this.viewCtrl.dismiss(goCart);
               } else if (res.status == -2) {
                  this.alertCtrl.create({
                     title: '镜库科技',
                     message: '购买需上传医疗器械许可证，是否上传',
                     buttons: [
                        {
                           text: '确定',
                           handler: () => {
                              this.viewCtrl.dismiss((navCtrl) => {
                                 navCtrl.push('AccountInfoPage', { dId: this.dId })
                              });
                           }
                        },
                        {
                           text: '取消',
                        }
                     ]
                  }).present();
               }
            })
         }
      }
      if (this.cutId > 0) {
         let parmas: any;
         if (this.goodsId == this.checkCutGoodsId) {
            if (!this.attrNumbers.length) {
               this.native.showToast('请添加样品商品数量')
               return
            }
            parmas = {
               arr_goods: [{ member: this.attrNumbers, spec: this.attrIds }],
               arr_goods_id: [this.goodsId],
               cutting_id: this.cutId
            }
         } else {
            if (this.getGoodsParamsArrs()) {
               for (let j = 0, items = this.goods_attribute.specification; j < items.length; j++) {
                  if (items[j].name.indexOf('定制类型') > -1) {//
                     for (let i = 0; i < items[j].values.length; i++) {
                        const element = items[j].values[i];
                        if (this.goods[0]['定制类型'] == element.id && element.vid == 678) {//定制类型是否为来架定制
                           parmas = {
                              arr_goods: [{
                                 member: this.memberArr,//所填写的商品的数量
                                 spc: this.spcArr,//商品选择的属性
                                 qiujing: this.qiujingArr,//所选的球镜
                                 zhujing: this.zhujingArr,//所选的柱镜
                                 zhouwei: this.zhouweiArr//所填写的轴位
                              }],
                              arr_goods_id: [this.checkCutGoodsId],
                              cutting_id: this.cutId
                           }
                        } else {
                           parmas = {
                              arr_goods: [
                                 { member: [1] },/* member: this.attrNumbers */
                                 {
                                    member: this.memberArr,//所填写的商品的数量
                                    spc: this.spcArr,//商品选择的属性
                                    qiujing: this.qiujingArr,//所选的球镜
                                    zhujing: this.zhujingArr,//所选的柱镜
                                    zhouwei: this.zhouweiArr//所填写的轴位
                                 }],
                              arr_goods_id: [this.goodsId, this.checkCutGoodsId],
                              cutting_id: this.cutId
                           }
                        }
                     }
                  } else {
                     // this.native.showToast('请添加样品商品数量')
                  }
               }
            } else {
               return false
            }
         }
         this.httpServ.add_to_cart_spec_cutting(parmas).then((res) => {
            if (res && res.status == 1) {
               this.native.showToast('添加成功')
               this.events.publish('car:update');//更新购物车
               this.viewCtrl.dismiss(goCart);
            } else if (res.status == -2) {
               this.alertCtrl.create({
                  title: '镜库科技',
                  message: '购买需上传医疗器械许可证，是否上传',
                  buttons: [{
                     text: '确定',
                     handler: () => {
                        this.viewCtrl.dismiss((navCtrl) => {
                           navCtrl.push('AccountInfoPage', { dId: this.dId })
                        });
                     }
                  }, {
                     text: '取消',
                  }]
               }).present();
            }
         }).catch((res) => {
            console.log(res)
         })
      }
   }
   goCarPage() {
      this.addToCart((navCtrl) => {
         navCtrl.push('CarPage', { dId: this.dId })
      });
   }
   goWriteOrdersDPage() {
      this.httpServ.checkout_d({ id: this.dId }).then(res => {
         if (res.status == -1) {
            this.alertCtrl.create({
               cssClass: 'alert-style',
               title: res.info,
               buttons: [
                  {
                     text: '确认',
                     handler: () => {
                        this.viewCtrl.dismiss((navCtrl) => {
                           navCtrl.push('DistributionQualificationPage');
                        });
                     }
                  }
               ],
            }).present();
         } else {
            this.viewCtrl.dismiss((navCtrl) => {
               navCtrl.push('WriteOrdersDPage', { dId: this.dId })
            });
         }
      })
   }
   scannerAddCart() {
      let parmas: any;
      if (this.scannerData.is_jingjia > 0) {
         if (!this.scanner_select) {
            return this.native.showToast('请选择商品');
         }
         parmas = {
            arr_goods: [{ member: [1], spc: [this.scanner_select.goods_attr_id] }],
            arr_goods_id: [this.goodsId],
            goods_id: this.goodsId,
            marking: this.scannerIndex
         }
      } else if (this.scannerData.is_jingpian > 0) {
         if (this.getGoodsParamsArrs()) {
            parmas = {
               arr_goods: [{
                  member: this.memberArr,//所填写的商品的数量
                  spc: this.spcArr,//商品选择的属性
                  qiujing: this.qiujingArr,//所选的球镜
                  zhujing: this.zhujingArr,//所选的柱镜
                  zhouwei: this.zhouweiArr//所填写的轴位
               }],
               arr_goods_id: [this.goodsId],
               goods_id: this.goodsId,
               marking: this.scannerIndex
            }
         }
      }
      this.httpServ.SpecialMachiningadd_to_cart_spec_jp(parmas).then((res) => {
         this.native.showToast(res.info);
         if (res.status == 1) {
            this.viewCtrl.dismiss(res, 'openScanner');
         }
      })
   }
}
