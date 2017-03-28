import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData } from "../services/user-data";

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  private ip = 'http://v401app.jingkoo.net';  // URL to web API
  constructor(public http: UserData) {
    console.log('Hello HttpService Provider');
  }
  getHomebanner(data?: Object) {//轮播图
    return this.http.get(this.ip + '/Index/ads/int_pos_id/3/int_size/10', data)
  }
  getCategoryAd(data?: Object) {//热门品类下的广告
    return this.http.get(this.ip + '/Index/ads/int_pos_id/27/int_size/10', data)
  }
  getCategoryRecommendGoods(data?: Object) {//新品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/new', data)
  }
  getCategoryRecommendGoodsBest(data?: Object) {//精品商品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/best', data)
  }
  getCategoryRecommendGoodsHot(data?: Object) {//精选专题下的商品列表
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/hot', data)
  }
  getBrands(data?: Object) {//热门品牌下的品牌列表
    return this.http.get(this.ip + '/Index/get_brands', data)
  }
  /*商品详情页*/
  getGoodsGallery(data?: Object) {//商品详情的相册图片轮播
    return this.http.get(this.ip + '/Goods/get_goods_gallery', data)
  }
  getPriceSection(data?: Object) {//商品价格优惠区间
    return this.http.get(this.ip + '/Goods/get_price_section', data)
  }
  getGoodsInfo(data?: Object) {//商品详情信息
    return this.http.get(this.ip + '/Goods/goods_info', data)
  }
  getGoodsParameter(data?: Object) {//获取商品参数
    return this.http.get(this.ip + '/Goods/get_goods_parameter', data)
  }
  getGoodsSaleCity(data?: Object) {//获取商品的销售区域
    return this.http.get(this.ip + '/Goods/get_goods_sale_city', data)
  }
  getSupplierInfo(data?: Object) {//获取供应商信息
    return this.http.get(this.ip + '/Goods/get_supplier_info', data)
  }
  getGoodsCollect(data?: Object) {//商品关注
    return this.http.get(this.ip + '/Goods/get_goods_collect', data)
  }
  collectDel(data?: Object) {//取消商品关注
    return this.http.get(this.ip + '/Goods/collect_del', data)
  }
  getBonus(data?: Object) {//优惠券列表
    return this.http.get(this.ip + '/Goods/get_bonus', data)
  }
  sendByUser(data?: Object) {//领取优惠券
    return this.http.get(this.ip + '/Goods/send_by_user', data)
  }
  getGoodsFittings(data?: Object) {//组合商品
    return this.http.get(this.ip + '/Goods/get_goods_fittings', data)
  }
  getLinkedGoods(data?: Object) {//关联商品
    return this.http.get(this.ip + '/Goods/get_linked_goods', data)
  }
  searchGoods(data?: Object) {//商品搜索列表页
    return this.http.post(this.ip + '/Search/search_goods', data)
  }
  /**
   * 商品分类列表页
   */
  getCategorys(data?: Object) {//获取九大分类
    return this.http.get(this.ip + '/Category/get_categorys', data)
  }
  getChildrenCaCtegory(data?: Object) {//获取九大分类下的子分类
    return this.http.get(this.ip + '/Category/get_children_category', data)
  }
  categoryGoods(data?: Object) {//商品分类列表页(筛选)
    return this.http.get(this.ip + '/Category/category_goods', data)
  }
  getGoodsAttribute(data?: Object) {//获取初始商品属性
    return this.http.get(this.ip + '/Goods/get_goods_attribute', data)
  }
  getAttrList(data?: Object) {//如果返回的(good_type) 商品类型是goods_spectacles 根据所选球镜，获取柱镜列表
    return this.http.get(this.ip + '/Goods/get_attr_list', data)
  }
  getZhujing(data?: Object) {//如果返回的(good_type) 商品类型是goods再调用接口如下
    return this.http.get(this.ip + '/Goods/get_zhujing', data)
  }
  addToCartSpecJp(data?: Object) {//镜片商品加入购物车
    return this.http.post(this.ip + '/Goods/add_to_cart_spec_jp', data)
  }
  addToCartSpec(data?: Object) {//普通商品加入购物车
    return this.http.post(this.ip + '/Goods/add_to_cart_spec', data)
  }
  /**
   * 购物车
   */
  getFlowGoods(data?: Object) {//购物车商品
    return this.http.get(this.ip + '/Flow/get_flow_goods', data)
  }
  changeNumCart(data?: Object) {//改变购物车数量
    return this.http.get(this.ip + '/Flow/change_num_cart', data)
  }
  dropCartGoods(data?: Object) {//(3)删除购物车中单独选择的商品
    return this.http.get(this.ip + '/Flow/drop_cart_goods', data)
  }
  dropCartGoodsSelect(data?: Object) {//(3)(4)删除购物车中全选的商品
    return this.http.get(this.ip + '/Flow/drop_cart_goods_select', data)
  }
  checkout(data?: Object) {//(4)(5)购物车去结算
    return this.http.get(this.ip + '/Flow/checkout', data)
  }
  /**
   * 个人中心页
   */
  getCityJsonData(data?: Object) {
    return this.http.get('./assets/data/city-data.json', data)
  }
  usercount(data?: Object) {//个人中心获取用户统计
    return this.http.get(this.ip + '/User/usercount', data)
  }
  userInfo(data?: Object) {//获取用户资料
    return this.http.get(this.ip +'/User/user_info', data)
  }
  getUserBonus(data?: Object) {//（1）个人中心优惠券
    return this.http.get(this.ip +'/User/get_user_bonus', data)
  }
  editPwd(data?: Object) {//（4）修改密码
    return this.http.post(this.ip +'/User/edit_pwd', data)
  }
  editMobile(data?: Object) {//（5）修改手机号
    return this.http.post(this.ip +'/User/edit_mobile', data)
  }
  logout(data?: Object) {//（6）退出登录
    return this.http.post(this.ip +'/User/logout', data)
  }
  watch(data?: Object) {//（7）个人中心浏览记录
    return this.http.get(this.ip +'/User/watch', data)
  }
  delWatch(data?: Object) {//（8）删除浏览记录
    return this.http.get(this.ip +'/User/del_watch', data)
  }
  addressList(data?: Object) {//（9）收货地址管理
    return this.http.get(this.ip +'/User/address_list', data)
  }
  delAddress(data?: Object) {//（10）删除收货地址
    return this.http.get(this.ip +'/User/del_address', data)
  }
  AddressDetail(data?: Object) {//（11）收货地址详情
    return this.http.get(this.ip +'/User/edit_address', data)
  }
  editAddress(data?: Object) {//（12）编辑收货地址
    return this.http.post(this.ip +'/User/edit_address', data)
  }
  changeRegion(data?: Object) {//（13）改变城市联动
    return this.http.get(this.ip +'/User/change_region', data)
  }
  help(data?: Object) {//（14）帮助中心
    return this.http.get(this.ip +'/User/help', data)
  }
  regionApply(data?: Object) {//（15）地区申请页
    return this.http.get(this.ip +'/User/region_apply', data)
  }
  postRegionApply(data?: Object) {//（16）地区申请页提交
    return this.http.post(this.ip +'/User/region_apply', data)
  }
  collectionList(data?: Object) {//（17）收藏的商品列表
    return this.http.get(this.ip +'/User/collection_list', data)
  }
  delCollectionGoods(data?: Object) {//（18）取消收藏商品
    return this.http.get(this.ip +'/User/del_collection_goods', data)
  }
  collectionShop(data?: Object) {//（19）收藏店铺列表
    return this.http.get(this.ip +'/User/collection_shop', data)
  }
  delCollectionShop(data?: Object) {//（20）取消收藏店铺
    return this.http.get(this.ip +'/User/del_collection_shop', data)
  }
}
