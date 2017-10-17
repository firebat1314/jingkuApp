import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData } from "../providers/user-data";
import { Storage } from '@ionic/storage';
import { IP } from './constants';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {
  public HAS_LOGGED_IN = "hasLoggedIn";

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

  clear(callBack) {
    this.storage.clear().then(callBack);
  }

  login(data?: Object) {//登录
    return this.http.post(IP + '/Login/index', data, true)
  }
  signupFirst(data?: Object) {//注册
    return this.http.post(IP + '/Login/register', data)
  }
  signupTwo(data?: Object) {//注册2
    return this.http.post(IP + '/Login/register', data)
  }
  getVerificationImg(data?: Object) {//图片验证码
    return this.http.post(IP + '/Login/verify', data)
  }
  getMobileCode(data?: Object) {//短信验证码
    return this.http.post(IP + '/Login/getMobileCode', data, true)
  }
  /*首页*/
  getHomebanner(data?: Object) {//轮播图
    return this.http.get(IP + '/Index/ads', data)
  }
  getCategoryAd(data?: Object) {//热门品类下的广告
    return this.http.get(IP + '/Index/ads', data)
  }
  getCategoryRecommendGoods(data?: Object) {//新品
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/new', data)
  }
  getCategoryRecommendGoodsBest(data?: Object) {//精品商品
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/best', data)
  }
  getCategoryRecommendGoodsHot(data?: Object) {//精选专题下的热门商品列表
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/hot', data)
  }
  getBrands(data?: Object) {//热门品牌下的品牌列表
    return this.http.get(IP + '/Index/get_brands', data)
  }
  /*商品详情页*/
  getGoodsGallery(data?: Object) {//商品详情的相册图片轮播
    return this.http.get(IP + '/Goods/get_goods_gallery', data)
  }
  getPriceSection(data?: Object) {//商品价格优惠区间
    return this.http.get(IP + '/Goods/get_price_section', data)
  }
  getGoodsInfo(data?: Object) {//商品详情信息
    return this.http.get(IP + '/Goods/goods_info', data)
  }
  getGoodsParameter(data?: Object) {//获取商品参数
    return this.http.get(IP + '/Goods/get_goods_parameter', data)
  }
  getGoodsSaleCity(data?: Object) {//获取商品的销售区域
    return this.http.get(IP + '/Goods/get_goods_sale_city', data)
  }
  setArea(data?: Object) {//商品切换销售区域
    return this.http.get(IP + '/Goods/set_area', data)
  }
  getSupplierInfo(data?: Object) {//获取供应商信息
    return this.http.get(IP + '/Goods/get_supplier_info', data)
  }
  getGoodsCollect(data?: Object) {//商品关注
    return this.http.post(IP + '/Goods/get_goods_collect', data)
  }
  CollectShop(data?: Object) {//店铺关注
    return this.http.post(IP + '/Goods/CollectShop', data)
  }
  collectDel(data?: Object) {//取消商品关注
    return this.http.get(IP + '/Goods/collect_del', data)
  }
  getBonus(data?: Object) {//优惠券列表
    return this.http.get(IP + '/Goods/get_bonus', data)
  }
  sendByUser(data?: Object) {//领取优惠券
    return this.http.get(IP + '/Goods/send_by_user', data)
  }
  getGoodsFittings(data?: Object) {//组合商品
    return this.http.get(IP + '/Goods/get_goods_fittings', data)
  }
  getLinkedGoods(data?: Object) {//关联商品
    return this.http.get(IP + '/Goods/get_linked_goods', data)
  }
  searchGoods(data?: Object) {//商品搜索列表页
    return this.http.post(IP + '/Search/search_goods', data)
  }
  /**
   * 商品分类列表页
   */
  getCategorys(data?: Object) {//获取九大分类
    return this.http.get(IP + '/Category/get_categorys', data)
  }
  getChildrenCaCtegory(data?: Object) {//获取九大分类下的子分类
    return this.http.get(IP + '/Category/get_children_category', data)
  }
  categoryGoods(data?: Object) {//商品分类列表页(筛选)
    return this.http.get(IP + '/Category/category_goods', data)
  }
  getGoodsAttribute(data?: Object) {//获取初始商品属性
    return this.http.get(IP + '/Goods/get_goods_attribute', data, true)
  }
  getZhujing(data?: Object) {//如果返回的(good_type) 商品类型是goods_spectacles 根据所选球镜，获取柱镜列表
    return this.http.get(IP + '/Goods/get_zhujing', data)
  }
  getAttrList(data?: Object) {//如果返回的(good_type) 商品类型是goods再调用接口如下
    return this.http.get(IP + '/Goods/get_attr_list', data)
  }
  addToCartSpecJp(data?: Object) {//镜片商品加入购物车
    return this.http.post(IP + '/Goods/add_to_cart_spec_jp', data)
  }
  addToCartSpec(data?: Object) {//普通商品加入购物车
    return this.http.post(IP + '/Goods/add_to_cart_spec', data, true)
  }
  changeGoodsNumber(data?: Object) {//改变商品数量 获取价格
    return this.http.post(IP + '/Goods/change_goods_number', data)
  }
  brandList(data?: Object) {//品牌列表
    return this.http.get(IP + '/Brand/brand_list', data)
  }
  /**
   * 购物车
   */
  getFlowGoods(data?: Object) {//购物车商品
    return this.http.get(IP + '/Flow/get_flow_goods', data)
  }
  changeNumCart(data?: Object) {//改变购物车数量
    return this.http.get(IP + '/Flow/change_num_cart', data)
  }
  dropCartGoods(data?: Object) {//(3)删除购物车中单独选择的商品
    return this.http.get(IP + '/Flow/drop_cart_goods_select', data)
  }
  dropCartGoodsSelect(data?: Object) {//删除购物车中全选的商品
    return this.http.post(IP + '/Flow/drop_cart_goods_select', data)
  }
  selectChangePrice(data?: Object) {//选中改变价格
    return this.http.post(IP + '/Flow/select_change_price', data)
  }
  changeConsignee(data?: Object) {//选择收货人信息
    return this.http.get(IP + '/Flow/change_consignee', data)
  }
  selectPayment(data?: Object) {//选择支付方式
    return this.http.get(IP + '/Flow/select_payment', data, true)
  }
  selectShippinSuppliers(data?: Object) {//选择配送方式
    return this.http.get(IP + '/Flow/select_shippin_suppliers', data, true)
  }
  newSelectShippinSuppliers(data?: Object) {//改版 选择配送方式
    return this.http.get(IP + '/Flow/new_select_shippin_suppliers', data)
  }
  suppliersBouns(data?: Object) {//使用优惠券
    return this.http.get(IP + '/Flow/suppliers_bouns', data, true)
  }
  checkout(data?: Object) {//购物车去结算
    return this.http.get(IP + '/Flow/checkout', data)
  }
  delNoShop(data?: Object) {//删除未选中的商品
    return this.http.post(IP + '/Flow/del_no_shop', data, true)
  }
  writeNotes(data?: Object) {//商家备注
    return this.http.post(IP + '/Flow/write_notes', data, true)
  }
  submitOrder(data?: Object) {//提交订单
    return this.http.post(IP + '/Flow/done', data, true)
  }
  pay(data: Object) {//支付方式
    return this.http.get(IP + '/Flow/pay', data, true)
  }
  payCode(data: Object) {//去支付
    return this.http.get(IP + '/Flow/pay_code', data, true)
  }
  /**
   * 个人中心页
   */
  FileJsonRegion(data?: Object) {
    return this.http.get(IP + '/Public/FileJsonRegion', data)
  }
  userCount(data?: Object) {//（1）个人中心获取用户统计
    return this.http.get(IP + '/User/usercount', data)
  }
  order(data?: Object) {//用户订单
    return this.http.get(IP + '/User/order', data)
  }
  orderInfo(data?: Object) {//订单详情
    return this.http.get(IP + '/User/order_info', data)
  }
  userInfo(data?: Object) {//（2）获取用户资料
    return this.http.get(IP + '/User/user_info', data)
  }
  getUserBonus(data?: Object) {//（3）个人中心优惠券
    return this.http.get(IP + '/User/get_user_bonus', data, true)
  }
  editPwd(data?: Object) {//（4）修改密码
    return this.http.post(IP + '/User/edit_pwd', data)
  }
  editMobile(data?: Object) {//（5）修改手机号
    return this.http.post(IP + '/User/edit_mobile', data, true)
  }
  logout(data?: Object) {//（6）退出登录
    return this.http.post(IP + '/User/logout', data)
  }
  watch(data?: Object) {//（7）个人中心浏览记录
    return this.http.get(IP + '/User/watch', data)
  }
  delWatch(data?: Object) {//（8）删除浏览记录
    return this.http.post(IP + '/User/del_watch', data)
  }
  addressList(data?: Object) {//（9）收货地址管理
    return this.http.get(IP + '/User/address_list', data)
  }
  delAddress(data?: Object) {//（10）删除收货地址
    return this.http.post(IP + '/User/del_address', data)
  }
  AddressDetail(data?: Object) {//（11）收货地址详情
    return this.http.get(IP + '/User/edit_address', data)
  }
  editAddress(data?: Object) {//（12）编辑收货地址
    return this.http.post(IP + '/User/edit_address', data, true)
  }
  addAddress(data?: Object) {//（12.1）添加收货地址
    return this.http.post(IP + '/User/add_address', data, true)
  }
  defaultAddress(data?: Object) {//（12.2）设置默认收货地址address_id
    return this.http.get(IP + '/User/default_address', data)
  }
  changeRegion(data?: Object) {//（13）改变城市联动
    return this.http.get(IP + '/Login/change_region', data)
  }
  help(data?: Object) {//（14）帮助中心
    return this.http.get(IP + '/User/help', data)
  }
  regionApply(data?: Object) {//（15）地区申请页
    return this.http.get(IP + '/User/region_apply', data)
  }
  postRegionApply(data?: Object) {//（16）地区申请页提交
    return this.http.post(IP + '/User/region_apply', data)
  }
  collectionList(data?: Object) {//（17）收藏的商品列表
    return this.http.post(IP + '/User/collection_list', data)
  }
  delCollectionGoods(data?: Object) {//（18）取消收藏商品
    return this.http.post(IP + '/User/del_collection_goods', data)
  }
  collectionShop(data?: Object) {//（19）收藏店铺列表
    return this.http.post(IP + '/User/collection_shop', data)
  }
  delCollectionShop(data?: Object) {//（20）取消收藏店铺
    return this.http.post(IP + '/User/del_collection_shop', data)
  }
  batchGoodsCollect(data?: Object) {//批量关注
    return this.http.post(IP + '/Flow/batch_goods_collect', data)
  }
  addinv(data?: Object) {//选择供货商后选择订单开票
    return this.http.get(IP + '/User/addinv', data, true)
  }
  selectzz(data?: Object) {//	发票索取信息
    return this.http.post(IP + '/User/selectzz', data, true)
  }
  insertInv(data?: Object) {//插入发票信息
    return this.http.post(IP + '/User/insert_inv', data, true)
  }
  invoice(data?: Object) {//发票索取列表
    return this.http.get(IP + '/User/invoice', data, true)
  }
  invList(data?: Object) {//发票列表
    return this.http.get(IP + '/User/inv_list', data, true)
  }
  invRole(data?: Object) {//发票信息管理
    return this.http.get(IP + '/User/inv_role', data, true)
  }
  updateInv(data?: Object) {//编辑发票资质
    return this.http.get(IP + '/User/update_inv', data)
  }
  updateInvPost(data?: Object) {//添加或编辑发票资质提交
    return this.http.post(IP + '/User/update_inv', data, true)
  }
  editProfile(data?: Object) {//修改用户资料
    return this.http.post(IP + '/User/profile', data, true)
  }
  editAvatar(data?: Object) {//修改头像
    return this.http.post(IP + '/User/avatar', data, true)
  }
  /**
   * 后加接口
  */
  getHotSearch(data?: Object) {//热门搜索接口
    return this.http.post(IP + '/Public/getHotSearch', data)
  }
  getAreaList(data?: Object) {//城市列表
    return this.http.post(IP + '/Public/getAreaList', data)
  }
  editArea(data?: Object) {//切换城市
    return this.http.post(IP + '/Index/EditArea', data)
  }
  getTidings(data?: Object) {//用户消息
    return this.http.post(IP + '/User/getTidings', data)
  }
  getWuLiuTidings(data?: Object) {//用户物流消息
    return this.http.get(IP + '/User/getWuLiuTidings', data)
  }
  exchange(data?: Object) {//积分商城
    return this.http.get(IP + '/Index/exchange', data)
  }
  accountLog(data?: Object) {//用户历史记录 默认user_money user_money 余额记录pay_points 积分记录
    return this.http.get(IP + '/User/accountLog', data)
  }
  presell(data?: Object) {//预售促销商品列表
    return this.http.get(IP + '/Index/presell', data, true)
  }
  helpInfo(data?: Object) {//帮助中心
    return this.http.get(IP + '/User/helpInfo', data, true)
  }
  userRank(data?: Object) {//用户等级
    return this.http.get(IP + '/User/UserRank', data)
  }
  affirmReceived(data?: Object) {//确认收货
    return this.http.post(IP + '/User/affirm_received', data)
  }
  getWuLiu(data?: Object) {//订单物流
    return this.http.get(IP + '/User/shipping_log', data)
  }
  exchangeGoods(data?: Object) {//积分兑换列表
    return this.http.get(IP + '/User/exchangeGoods', data)
  }
  exchangeGoodsInfo(data?: Object) {//积分兑换详情
    return this.http.get(IP + '/User/exchangeGoodsInfo', data)
  }
  exchangebuy(data?: Object) {//兑换积分商品
    return this.http.get(IP + '/Flow/exchangebuy', data)
  }
  cancelOrder(data?: Object) {//取消订单
    return this.http.get(IP + '/User/cancel_order', data)
  }
  withdrawals(data?: Object) {//用户提现
    return this.http.get(IP + '/User/withdrawals', data)
  }
  goodsInfos(data?: Object) {//商品详情
    return this.http.get(IP + '/Goods/goods_infos', data)
  }
  forgotPwd(data?: Object) {//忘记密码
    return this.http.post(IP + '/Login/forgotPwd', data, true)
  }
  coupon(data?: Object) {//首页优惠券
    return this.http.get(IP + '/Index/coupon', data, true)
  }
  delOrder(data?: Object) {//删除订单
    return this.http.get(IP + '/User/del_order', data)
  }
  addAccount(data?: Object) {//充值
    return this.http.post(IP + '/User/addAccount', data)
  }
  getAccountPayList(data?: Object) {//充值新增转账付款方式
    return this.http.get(IP + '/User/getAccountPayList', data)
  }
  indexs(data?: Object) {//首页统一
    return this.http.get(IP + '/Index/indexs', data)
  }
  suppliersIndex(data?: Object) {//店铺首页
    return this.http.post(IP + '/Category/suppliers_index', data)
  }
  suppliersPromote(data?: Object) {//店铺促销
    return this.http.post(IP + '/Category/suppliers_promote_goods', data)
  }
  suppliersCategoryGoods(data?: Object) {//店铺促销
    return this.http.post(IP + '/Category/suppliers_category_goods', data)
  }
  orderRepair(data?: Object) {//售后申请列表
    return this.http.post(IP + '/User/order_repair', data)
  }
  repairApply(data?: Object) {//点击申请售后
    return this.http.post(IP + '/User/repair_apply', data)
  }
  submitRepair(data?: Object) {//3）提交返修退换货
    return this.http.post(IP + '/User/submit_repair', data, true)
  }
  fuwudan(data?: Object) {//4）填写快递单
    return this.http.post(IP + '/User/fuwudan', data)
  }
  repairList(data?: Object) {//5）返修单记录
    return this.http.post(IP + '/User/repair_list', data)
  }
  cancelReturn(data?: Object) {//6）取消售后
    return this.http.post(IP + '/User/cancel_return', data)
  }
  repairInfo(data?: Object) {//7）服务单详情
    return this.http.post(IP + '/User/repair_info', data)
  }
  CatrgorySupplierInfo(data?: Object) {//7）服务单详情
    return this.http.post(IP + '/Category/get_supplier_info', data)
  }
  changeSurplus(data?: Object) {//切换余额支付
    return this.http.post(IP + '/Flow/change_surplus', data, true)
  }
  clearFlowOrder(data?: Object) {//去结算使用余额
    return this.http.get(IP + '/Flow/clear_flow_order', data)
  }
  versionInfo(data?: Object) {//版本更新
    return this.http.get(IP + '/Login/version_info', data)
  }
  doublePayment(data?: Object) {//余额改版
    return this.http.get(IP + '/Flow/double_payment', data, true)
  }
  checkPayPass(data?: Object) {//支付密码
    return this.http.post(IP + '/Flow/check_pay_pass', data)
  }
  editPaypwd(data?: Object) {//修改密码
    return this.http.post(IP + '/User/edit_paypwd', data)
  }
  rechargeMoney(data?: Object) {//新充值
    return this.http.post(IP + '/User/recharge_money', data)
  }
  /**
   * 来镜加工 User/machining
   */
  machining(data?: Object) {
    return this.http.get(IP + '/User/machining', data)
  }
  /**
   * 申请加工
   * @param 
   */
  glassMachining(data?: Object) {
    return this.http.post(IP + '/Machining/glass_machining', data)
  }
  /**
   * 闪购
   * @param 
   */
  getCategoryPromote(data?: Object) {
    return this.http.post(IP + '/Index/getCategoryPromote', data)
  }
  /**
   * 预售
   * @param 
   */
  getCategoryPre(data?: Object) {
    return this.http.post(IP + '/Index/getCategoryPre', data)
  }
  /**
   * 再次购买加入购物车
   * @param 
   */
  alignBuy(data?: Object) {
    return this.http.post(IP + '/User/align_buy', data)
  }
  /**
   * 极验验证
   */
  geeTestinit(data?: Object) {
    return this.http.get(IP + '/Login/geeTestinit', data)
  }
  /**
   * 金融
   */
  Ximu(data?: Object) {
    return this.http.get(IP + '/Ximu', data)
  }
}
