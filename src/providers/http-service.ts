import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData } from "../providers/user-data";
import { Storage } from '@ionic/storage';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  public HAS_LOGGED_IN = "hasLoggedIn";
  public hasLogin = false;
  // private ip = 'http://v402app.jingkoo.net';//app测试
  // private ip = 'http://app.jingku.cn';//app正式
  // private ip = 'http://hl.jingkoo.net/';//响应速度测试
  private ip = 'http://newm.jingkoo.net';//m站

  constructor(public http: UserData, private storage: Storage) {
    console.log('Hello HttpService Provider');
  }

  setToken(token) {
    this.storage.set("token", token);
  }

  getToken() {
    return this.storage.get("token");
  }
  setUsername(username) {
    this.storage.set("username", username);
  }

  getUsername() {
    return this.storage.get("username");
  }

  setStorage(key, value) {
    this.storage.set(key, value);
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  removeStorage(key) {
    this.storage.remove(key)
  }
  login(data?: Object) {//登录
    return this.http.post(this.ip + '/Login/index', data, true)
  }
  signupFirst(data?: Object) {//注册
    return this.http.post(this.ip + '/Login/register', data)
  }
  signupTwo(data?: Object) {//注册2
    return this.http.post(this.ip + '/Login/register', data)
  }
  getVerificationImg(data?: Object) {//图片验证码
    return this.http.post(this.ip + '/Login/verify', data)
  }
  getMobileCode(data?: Object) {//短信验证码
    return this.http.post(this.ip + '/Login/getMobileCode', data, true)
  }
  /*首页*/
  getHomebanner(data?: Object) {//轮播图
    return this.http.get(this.ip + '/Index/ads', data)
  }
  getCategoryAd(data?: Object) {//热门品类下的广告
    return this.http.get(this.ip + '/Index/ads', data)
  }
  getCategoryRecommendGoods(data?: Object) {//新品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/new', data)
  }
  getCategoryRecommendGoodsBest(data?: Object) {//精品商品
    return this.http.get(this.ip + '/Index/get_category_recommend_goods/type/best', data)
  }
  getCategoryRecommendGoodsHot(data?: Object) {//精选专题下的热门商品列表
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
  setArea(data?: Object) {//商品切换销售区域
    return this.http.get(this.ip + '/Goods/set_area', data)
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
    return this.http.get(this.ip + '/Category/get_children_category', data, true)
  }
  categoryGoods(data?: Object) {//商品分类列表页(筛选)
    return this.http.get(this.ip + '/Category/category_goods', data)
  }
  getGoodsAttribute(data?: Object) {//获取初始商品属性
    return this.http.get(this.ip + '/Goods/get_goods_attribute', data)
  }
  getZhujing(data?: Object) {//如果返回的(good_type) 商品类型是goods_spectacles 根据所选球镜，获取柱镜列表
    return this.http.get(this.ip + '/Goods/get_zhujing', data)
  }
  getAttrList(data?: Object) {//如果返回的(good_type) 商品类型是goods再调用接口如下
    return this.http.get(this.ip + '/Goods/get_attr_list', data, true)
  }
  addToCartSpecJp(data?: Object) {//镜片商品加入购物车
    return this.http.post(this.ip + '/Goods/add_to_cart_spec_jp', data)
  }
  addToCartSpec(data?: Object) {//普通商品加入购物车
    return this.http.post(this.ip + '/Goods/add_to_cart_spec', data, true)
  }
  changeGoodsNumber(data?: Object) {//改变商品数量 获取价格
    return this.http.post(this.ip + '/Goods/change_goods_number', data)
  }
  brandList(data?: Object) {//品牌列表
    return this.http.get(this.ip + '/Brand/brand_list', data)
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
  dropCartGoodsSelect(data?: Object) {//删除购物车中全选的商品
    return this.http.post(this.ip + '/Flow/drop_cart_goods_select', data)
  }
  selectChangePrice(data?: Object) {//选中改变价格
    return this.http.post(this.ip + '/Flow/select_change_price', data)
  }
  changeConsignee(data?: Object) {//选择收货人信息
    return this.http.get(this.ip + '/Flow/change_consignee', data)
  }
  selectPayment(data?: Object) {//选择支付方式
    return this.http.get(this.ip + '/Flow/select_payment', data)
  }
  selectShippinSuppliers(data?: Object) {//选择配送方式
    return this.http.get(this.ip + '/Flow/select_shippin_suppliers', data)
  }
  suppliersBouns(data?: Object) {//使用优惠券
    return this.http.get(this.ip + '/Flow/suppliers_bouns', data)
  }
  checkout(data?: Object) {//购物车去结算
    return this.http.get(this.ip + '/Flow/checkout', data)
  }
  delNoShop(data?: Object) {//删除未选中的商品
    return this.http.post(this.ip + '/Flow/del_no_shop', data, true)
  }
  submitOrder(data?: Object) {//提交订单
    return this.http.post(this.ip + '/Flow/done', data)
  }
  pay(data: Object) {//支付方式
    return this.http.get(this.ip + '/Flow/pay', data, true)
  }
  payCode(data: Object) {//去支付
    return this.http.get(this.ip + '/Flow/pay_code', data, true)
  }
  /**
   * 个人中心页
   */
  FileJsonRegion(data?: Object) {
    return this.http.get(this.ip + '/Public/FileJsonRegion', data)
  }
  usercount(data?: Object) {//（1）个人中心获取用户统计
    return this.http.get(this.ip + '/User/usercount', data)
  }
  order(data?: Object) {//用户订单
    return this.http.get(this.ip + '/User/order', data)
  }
  orderInfo(data?: Object) {//订单详情
    return this.http.get(this.ip + '/User/order_info', data)
  }
  userInfo(data?: Object) {//（2）获取用户资料
    return this.http.get(this.ip + '/User/user_info', data)
  }
  getUserBonus(data?: Object) {//（3）个人中心优惠券
    return this.http.get(this.ip + '/User/get_user_bonus', data)
  }
  editPwd(data?: Object) {//（4）修改密码
    return this.http.post(this.ip + '/User/edit_pwd', data)
  }
  editMobile(data?: Object) {//（5）修改手机号
    return this.http.post(this.ip + '/User/edit_mobile', data, true)
  }
  logout(data?: Object) {//（6）退出登录
    return this.http.post(this.ip + '/User/logout', data)
  }
  watch(data?: Object) {//（7）个人中心浏览记录
    return this.http.get(this.ip + '/User/watch', data)
  }
  delWatch(data?: Object) {//（8）删除浏览记录
    return this.http.post(this.ip + '/User/del_watch', data)
  }
  addressList(data?: Object) {//（9）收货地址管理
    return this.http.get(this.ip + '/User/address_list', data)
  }
  delAddress(data?: Object) {//（10）删除收货地址
    return this.http.post(this.ip + '/User/del_address', data)
  }
  AddressDetail(data?: Object) {//（11）收货地址详情
    return this.http.get(this.ip + '/User/edit_address', data)
  }
  editAddress(data?: Object) {//（12）编辑收货地址
    return this.http.post(this.ip + '/User/edit_address', data, true)
  }
  addAddress(data?: Object) {//（12.1）添加收货地址
    return this.http.post(this.ip + '/User/add_address', data, true)
  }
  defaultAddress(data?: Object) {//（12.2）设置默认收货地址address_id
    return this.http.get(this.ip + '/User/default_address', data)
  }
  changeRegion(data?: Object) {//（13）改变城市联动
    return this.http.get(this.ip + '/Login/change_region', data)
  }
  help(data?: Object) {//（14）帮助中心
    return this.http.get(this.ip + '/User/help', data)
  }
  regionApply(data?: Object) {//（15）地区申请页
    return this.http.get(this.ip + '/User/region_apply', data)
  }
  postRegionApply(data?: Object) {//（16）地区申请页提交
    return this.http.post(this.ip + '/User/region_apply', data)
  }
  collectionList(data?: Object) {//（17）收藏的商品列表
    return this.http.post(this.ip + '/User/collection_list', data)
  }
  delCollectionGoods(data?: Object) {//（18）取消收藏商品
    return this.http.post(this.ip + '/User/del_collection_goods', data)
  }
  collectionShop(data?: Object) {//（19）收藏店铺列表
    return this.http.post(this.ip + '/User/collection_shop', data)
  }
  delCollectionShop(data?: Object) {//（20）取消收藏店铺
    return this.http.post(this.ip + '/User/del_collection_shop', data)
  }
  batchGoodsCollect(data?: Object) {//批量关注
    return this.http.post(this.ip + '/Flow/batch_goods_collect', data)
  }
  invoice(data?: Object) {//发票索取列表
    return this.http.get(this.ip + '/User/invoice', data)
  }
  addinv(data?: Object) {//选择供货商后选择订单开票
    return this.http.get(this.ip + '/User/addinv', data, true)
  }
  selectzz(data?: Object) {//	发票索取信息
    return this.http.post(this.ip + '/User/selectzz', data, true)
  }
  insertInv(data?: Object) {//插入发票信息
    return this.http.post(this.ip + '/User/insert_inv', data, true)
  }
  invList(data?: Object) {//发票列表
    return this.http.get(this.ip + '/User/inv_list', data)
  }
  invRole(data?: Object) {//发票信息管理
    return this.http.get(this.ip + '/User/inv_role', data)
  }
  updateInv(data?: Object) {//编辑发票资质
    return this.http.get(this.ip + '/User/update_inv', data)
  }
  updateInvPost(data?: Object) {//添加或编辑发票资质提交
    return this.http.post(this.ip + '/User/update_inv', data, true)
  }
  editProfile(data?: Object) {//修改用户资料
    return this.http.post(this.ip + '/User/profile', data, true)
  }
  editAvatar(data?: Object) {//修改头像
    return this.http.post(this.ip + '/User/avatar', data)
  }
  /**
   * 后加接口
  */
  getHotSearch(data?: Object) {//热门搜索接口
    return this.http.post(this.ip + '/Public/getHotSearch', data)
  }
  getAreaList(data?: Object) {//城市列表
    return this.http.post(this.ip + '/Public/getAreaList', data)
  }
  editArea(data?: Object) {//切换城市
    return this.http.post(this.ip + '/Index/EditArea', data)
  }
  getTidings(data?: Object) {//用户消息
    return this.http.post(this.ip + '/User/getTidings', data)
  }
  getWuLiuTidings(data?: Object) {//用户物流消息
    return this.http.get(this.ip + '/User/getWuLiuTidings', data)
  }
  exchange(data?: Object) {//积分商城
    return this.http.get(this.ip + '/Index/exchange', data)
  }
  accountLog(data?: Object) {//用户历史记录 默认user_money user_money 余额记录pay_points 积分记录
    return this.http.get(this.ip + '/User/accountLog', data)
  }
  presell(data?: Object) {//预售促销商品列表
    return this.http.get(this.ip + '/Index/presell', data)
  }
  helpInfo(data?: Object) {//帮助中心
    return this.http.get(this.ip + '/User/helpInfo', data, true)
  }
  userRank(data?: Object) {//用户等级
    return this.http.get(this.ip + '/User/UserRank', data)
  }
  affirmReceived(data?: Object) {//确认收货
    return this.http.post(this.ip + '/User/affirm_received', data)
  }
  getWuLiu(data?: Object) {//订单物流
    return this.http.get(this.ip + '/User/GetWuLiu', data)
  }
  machining(data?: Object) {//来镜加工
    return this.http.get(this.ip + '/User/machining', data)
  }
  exchangeGoods(data?: Object) {//积分兑换列表
    return this.http.get(this.ip + '/User/exchangeGoods', data)
  }
  exchangeGoodsInfo(data?: Object) {//积分兑换详情
    return this.http.get(this.ip + '/User/exchangeGoodsInfo', data)
  }
  exchangebuy(data?: Object) {//兑换积分商品
    return this.http.get(this.ip + '/Flow/exchangebuy', data)
  }
  cancelOrder(data?: Object) {//取消订单
    return this.http.get(this.ip + '/User/cancel_order', data)
  }
  withdrawals(data?: Object) {//用户提现
    return this.http.get(this.ip + '/User/withdrawals', data)
  }
  goodsInfos(data?: Object) {//商品详情
    return this.http.get(this.ip + '/Goods/goods_infos', data)
  }
  forgotPwd(data?: Object) {//忘记密码
    return this.http.post(this.ip + '/Login/forgotPwd', data, true)
  }
  coupon(data?: Object) {//首页优惠券
    return this.http.get(this.ip + '/Index/coupon', data, true)
  }
  delOrder(data?: Object) {//删除订单
    return this.http.get(this.ip + '/User/del_order', data)
  }
  addAccount(data?: Object) {//充值
    return this.http.post(this.ip + '/User/addAccount', data)
  }
  getAccountPayList(data?: Object){//充值新增转账付款方式
    return this.http.get(this.ip + '/User/getAccountPayList', data)
  }
  indexs(data?: Object){//首页统一
    return this.http.get(this.ip + '/Index/indexs', data)
  }
}
