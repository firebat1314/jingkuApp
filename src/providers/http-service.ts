import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

import { UserData, HttpOptions } from "../providers/user-data";
import { Storage } from '@ionic/storage';
import { IP } from './constants';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpService {

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
    return this.storage.set(key, value);
  }

  getStorage(key) {
    return this.storage.get(key);
  }

  removeStorage(key) {
    this.storage.remove(key)
  }

  setByName(key, value) {
    this.getStorage('username').then((res) => {
      if (res) return this.setStorage(res + '_' + key, value);
    })
  }

  getByName(key) {
    return this.getStorage('username').then((res) => {
      if (res) return this.getStorage(res + '_' + key)
    })
  }

  clear(callBack) {
    this.storage.clear().then(callBack);
  }

  loginCompany(data?: Object) {//登录
    return this.http.post(IP + '/Login/loginCompany', data, { showLoading: true })
  }
  fastLogin(data?: Object) {//登录
    return this.http.post(IP + '/Login/fastLogin', data, { showLoading: true })
  }
  login(data?: Object) {//登录
    return this.http.post(IP + '/Login/index', data, { showLoading: true })
  }
  signupFirst(data?: Object) {//注册
    return this.http.post(IP + '/Login/new_register', data, { showLoading: true })
  }
  signupTwo(data?: Object) {//注册2
    return this.http.post(IP + '/Login/new_register', data, { timeout: 20000, showLoading: true })
  }
  getVerificationImg(data?: Object) {//图片验证码
    return this.http.post(IP + '/Login/verify', data, { showLoading: false })
  }
  getMobileCode(data?: Object) {//短信验证码
    return this.http.post(IP + '/Login/getMobileCode', data, { showLoading: true })
  }
  /*首页*/
  getHomebanner(data?: Object) {//轮播图
    return this.http.get(IP + '/Index/ads', data, { showLoading: false })
  }
  getCategoryAd(data?: Object) {//热门品类下的广告
    return this.http.get(IP + '/Index/ads', data, { showLoading: false })
  }
  getCategoryRecommendGoods(data?: Object) {//新品
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/new', data, { showLoading: false })
  }
  getCategoryRecommendGoodsBest(data?: Object) {//精品商品
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/best', data, { showLoading: false })
  }
  getCategoryRecommendGoodsHot(data?: Object) {//精选专题下的热门商品列表
    return this.http.get(IP + '/Index/get_category_recommend_goods/type/hot', data, { showLoading: false })
  }
  getBrands(data?: Object) {//热门品牌下的品牌列表
    return this.http.get(IP + '/Index/get_brands', data, { showLoading: false })
  }
  /*商品详情页*/
  getGoodsGallery(data?: Object) {//商品详情的相册图片轮播
    return this.http.get(IP + '/Goods/get_goods_gallery', data, { showLoading: false })
  }
  getPriceSection(data?: Object) {//商品价格优惠区间
    return this.http.get(IP + '/Goods/get_price_section', data, { showLoading: false })
  }
  getGoodsInfo(data?: Object) {//商品详情信息
    return this.http.get(IP + '/Goods/goods_info', data, { showLoading: true })
  }
  getGoodsParameter(data?: Object) {//获取商品参数
    return this.http.get(IP + '/Goods/get_goods_parameter', data, { showToast: false })
  }
  getGoodsSaleCity(data?: Object) {//获取商品的销售区域
    return this.http.get(IP + '/Goods/get_goods_sale_city', data, { showLoading: false })
  }
  setArea(data?: Object) {//商品切换销售区域
    return this.http.get(IP + '/Goods/set_area', data, { showLoading: false })
  }
  getSupplierInfo(data?: Object) {//获取供应商信息
    return this.http.get(IP + '/Goods/get_supplier_info', data, { showLoading: false })
  }
  getGoodsCollect(data?: Object) {//商品关注
    return this.http.post(IP + '/Goods/get_goods_collect', data, { showLoading: false })
  }
  CollectShop(data?: Object) {//店铺关注
    return this.http.post(IP + '/Goods/CollectShop', data, { showLoading: false })
  }
  collectDel(data?: Object) {//取消商品关注
    return this.http.get(IP + '/Goods/collect_del', data, { showLoading: false })
  }
  getBonus(data?: Object) {//优惠券列表
    return this.http.get(IP + '/Goods/get_bonus', data, { showLoading: false })
  }
  sendByUser(data?: Object) {//领取优惠券
    return this.http.get(IP + '/Goods/send_by_user', data, { showLoading: false })
  }
  getGoodsFittings(data?: Object) {//组合商品
    return this.http.get(IP + '/Goods/get_goods_fittings', data, { showLoading: false })
  }
  getLinkedGoods(data?: Object) {//关联商品
    return this.http.get(IP + '/Goods/get_linked_goods', data, { showLoading: false })
  }
  searchGoods(data?: Object) {//商品搜索列表页
    return this.http.post(IP + '/Search/search_goods', data, { showLoading: false })
  }
  /**
   * 商品分类列表页
   */
  getCategorys(data?: Object) {//获取九大分类
    return this.http.get(IP + '/Category/get_categorys', data, { showLoading: false })
  }
  getChildrenCaCtegory(data?: Object) {//获取九大分类下的子分类
    return this.http.get(IP + '/Category/get_children_category', data, { showLoading: true })
  }
  categoryGoods(data?: Object, options?: HttpOptions) {//商品分类列表页(筛选)
    return this.http.post(IP + '/Category/category_goods', data, options)
  }
  getGoodsAttribute(data?: Object) {//获取初始商品属性
    return this.http.get(IP + '/Goods/get_goods_attribute', data, { showLoading: true })
  }
  getZhujing(data?: Object) {//如果返回的(good_type)  商品类型是goods_spectacles 根据所选球镜，获取柱镜列表
    return this.http.get(IP + '/Goods/get_zhujing', data, { showLoading: false })
  }
  getAttrList(data?: Object) {//如果返回的(good_type) 商品类型是goods再调用接口如下
    return this.http.get(IP + '/Goods/get_attr_list', data, { showLoading: false })
  }
  addToCartSpecJp(data?: Object, options: HttpOptions = { showLoading: false, showToast: false }) {//镜片商品加入购物车
    return this.http.post(IP + '/Goods/add_to_cart_spec_jp', data, options)
  }
  addToCartSpec(data?: Object) {//普通商品加入购物车
    return this.http.post(IP + '/Goods/add_to_cart_spec', data, { showLoading: true })
  }
  changeGoodsNumber(data?: Object) {//改变商品数量 获取价格
    return this.http.post(IP + '/Goods/change_goods_number', data, { showLoading: false })
  }
  brandList(data?: Object) {//品牌列表
    return this.http.get(IP + '/Brand/brand_list', data, { showLoading: false })
  }
  /**
   * 购物车
   */
  getFlowGoods(data?: Object) {//购物车商品
    return this.http.get(IP + '/Flow/get_flow_goods', data, { showLoading: false })
  }
  changeNumCart(data?: Object) {//改变购物车数量
    return this.http.get(IP + '/Flow/change_num_cart', data, { showLoading: true })
  }
  dropCartGoods(data?: Object) {//(3)删除购物车中单独选择的商品
    return this.http.get(IP + '/Flow/drop_cart_goods_select', data, { showLoading: false })
  }
  dropCartGoodsSelect(data?: Object) {//删除购物车中全选的商品
    return this.http.post(IP + '/Flow/drop_cart_goods_select', data, { showLoading: false })
  }
  selectChangePrice(data?: Object) {//选中改变价格
    return this.http.post(IP + '/Flow/select_change_price', data, { showLoading: true })
  }
  changeConsignee(data?: Object) {//选择收货人信息
    return this.http.get(IP + '/Flow/change_consignee', data, { showLoading: false })
  }
  selectPayment(data?: Object) {//选择支付方式
    return this.http.get(IP + '/Flow/select_payment', data, { showLoading: false })
  }
  selectShippinSuppliers(data?: Object) {//选择配送方式
    return this.http.get(IP + '/Flow/select_shippin_suppliers', data, { showLoading: false })
  }
  newSelectShippinSuppliers(data?: Object) {//改版 选择配送方式
    return this.http.get(IP + '/Flow/new_select_shippin_suppliers', data, { showLoading: false })
  }
  suppliersBouns(data?: Object) {//使用优惠券
    return this.http.get(IP + '/Flow/suppliers_bouns', data, { showLoading: true })
  }
  checkout(data?: Object) {//购物车去结算
    return this.http.get(IP + '/Flow/checkout', data, { showLoading: false })
  }
  delNoShop(data?: Object) {//删除未选中的商品
    return this.http.post(IP + '/Flow/del_no_shop', data, { showLoading: true })
  }
  writeNotes(data?: Object) {//商家备注
    return this.http.post(IP + '/Flow/write_notes', data, { showLoading: true })
  }
  submitOrder(data?: Object) {//提交订单
    return this.http.post(IP + '/Flow/done', data, { showLoading: true })
  }
  pay(data: Object) {//支付方式
    return this.http.get(IP + '/Flow/pay', data, { showLoading: true })
  }
  payCode(data: Object) {//去支付
    return this.http.get(IP + '/Flow/pay_code', data, { showLoading: true })
  }
  /**
   * 个人中心页
   */
  FileJsonRegion(data?: Object) {
    return this.http.get(IP + '/Public/FileJsonRegion', data, { showLoading: false })
  }
  userCount(data?: Object) {//（1）个人中心获取用户统计
    return this.http.get(IP + '/User/usercount', data, { showLoading: false })
  }
  weixingetOauthRedirect(data?: Object, options: HttpOptions = { showLoading: false, showToast: false }) {//用户订单
    return this.http.post(IP + '/Weixin/weixingetOauthRedirect', data, options)
  }
  order(data?: Object, options?: HttpOptions) {//用户订单
    return this.http.get(IP + '/User/order', data, options)
  }
  orderInfo(data?: Object) {//订单详情
    return this.http.get(IP + '/User/order_info', data, { showLoading: true })
  }
  userInfo(data?: Object) {//（2）获取用户资料
    return this.http.get(IP + '/User/user_info', data, { showLoading: false })
  }
  getUserBonus(data?: Object) {//（3）个人中心优惠券
    return this.http.get(IP + '/User/get_user_bonus', data, { showLoading: true })
  }
  editPwd(data?: Object) {//（4）修改密码
    return this.http.post(IP + '/User/edit_pwd', data, { showLoading: false })
  }
  editMobile(data?: Object) {//（5）修改手机号
    return this.http.post(IP + '/User/edit_mobile', data, { showLoading: true })
  }
  logout(data?: Object) {//（6）退出登录
    return this.http.post(IP + '/User/logout', data, { showLoading: false })
  }
  watch(data?: Object) {//（7）个人中心浏览记录
    return this.http.get(IP + '/User/watch', data, { showLoading: true })
  }
  delWatch(data?: Object) {//（8）删除浏览记录
    return this.http.post(IP + '/User/del_watch', data, { showLoading: false })
  }
  addressList(data?: Object) {//（9）收货地址管理
    return this.http.get(IP + '/User/address_list', data, { showLoading: false })
  }
  delAddress(data?: Object) {//（10）删除收货地址
    return this.http.post(IP + '/User/del_address', data, { showLoading: false })
  }
  AddressDetail(data?: Object) {//（11）收货地址详情
    return this.http.get(IP + '/User/edit_address', data, { showLoading: true })
  }
  editAddress(data?: Object) {//（12）编辑收货地址
    return this.http.post(IP + '/User/edit_address', data, { showLoading: true })
  }
  addAddress(data?: Object) {//（12.1）添加收货地址
    return this.http.post(IP + '/User/add_address', data, { showLoading: true })
  }
  defaultAddress(data?: Object) {//（12.2）设置默认收货地址address_id
    return this.http.get(IP + '/User/default_address', data, { showLoading: false })
  }
  changeRegion(data?: Object) {//（13）改变城市联动
    return this.http.get(IP + '/Login/change_region', data, { showLoading: false })
  }
  help(data?: Object) {//（14）帮助中心
    return this.http.get(IP + '/User/help', data, { showLoading: true })
  }
  regionApply(data?: Object) {//（15）地区申请页
    return this.http.get(IP + '/User/region_apply', data, { showLoading: true })
  }
  postRegionApply(data?: Object) {//（16）地区申请页提交
    return this.http.post(IP + '/User/region_apply', data, { showLoading: false })
  }
  collectionList(data?: Object) {//（17）收藏的商品列表
    return this.http.post(IP + '/User/collection_list', data, { showLoading: true })
  }
  delCollectionGoods(data?: Object) {//（18）取消收藏商品
    return this.http.post(IP + '/User/del_collection_goods', data, { showLoading: false })
  }
  collectionShop(data?: Object) {//（19）收藏店铺列表
    return this.http.post(IP + '/User/collection_shop', data, { showLoading: true })
  }
  delCollectionShop(data?: Object) {//（20）取消收藏店铺
    return this.http.post(IP + '/User/del_collection_shop', data, { showLoading: false })
  }
  batchGoodsCollect(data?: Object) {//批量关注
    return this.http.post(IP + '/Flow/batch_goods_collect', data, { showLoading: false })
  }
  addinv(data?: Object) {//选择供货商后选择订单开票
    return this.http.get(IP + '/User/addinv', data, { showLoading: true })
  }
  selectzz(data?: Object) {//	发票索取信息
    return this.http.post(IP + '/User/selectzz', data, { showLoading: true })
  }
  insertInv(data?: Object) {//插入发票信息
    return this.http.post(IP + '/User/insert_inv', data, { showLoading: true })
  }
  invoice(data?: Object) {//发票索取列表
    return this.http.get(IP + '/User/invoice', data, { showLoading: false })
  }
  invList(data?: Object) {//发票列表
    return this.http.get(IP + '/User/inv_list', data, { showLoading: false })
  }
  invRole(data?: Object) {//发票信息管理
    return this.http.get(IP + '/User/inv_role', data, { showLoading: false })
  }
  updateInv(data?: Object) {//编辑发票资质
    return this.http.get(IP + '/User/update_inv', data, { showLoading: false })
  }
  updateInvPost(data?: Object) {//添加或编辑发票资质提交
    return this.http.post(IP + '/User/update_inv', data, { showLoading: true })
  }
  editProfile(data?: Object) {//修改用户资料
    return this.http.post(IP + '/User/profile', data, { showLoading: true })
  }
  editAvatar(data?: Object) {//修改头像
    return this.http.post(IP + '/User/avatar', data, { showLoading: true })
  }
  /**
   * 后加接口
  */
  getHotSearch(data?: Object) {//热门搜索接口
    return this.http.post(IP + '/Public/getHotSearch', data, { showLoading: false })
  }
  getAreaList(data?: Object) {//城市列表
    return this.http.post(IP + '/Public/getAreaList', data, { showLoading: false })
  }
  editArea(data?: Object) {//切换城市
    return this.http.post(IP + '/Index/EditArea', data, { showLoading: false })
  }
  getTidings(data?: Object) {//用户消息
    return this.http.post(IP + '/User/getTidings', data, { showLoading: false })
  }
  getWuLiuTidings(data?: Object) {//用户物流消息
    return this.http.get(IP + '/User/getWuLiuTidings', data, { showLoading: false })
  }
  exchange(data?: Object) {//积分商城
    return this.http.get(IP + '/Index/exchange', data, { showLoading: true })
  }
  accountLog(data?: Object, options: HttpOptions = { showLoading: true }) {//用户历史记录 默认user_money user_money 余额记录pay_points 积分记录
    return this.http.get(IP + '/User/accountLog', data)
  }
  presell(data?: Object, options: HttpOptions = { showLoading: true }) {//预售促销商品列表
    return this.http.get(IP + '/Index/presell', data, options)
  }
  helpInfo(data?: Object) {//帮助中心
    return this.http.get(IP + '/User/helpInfo', data, { showLoading: true })
  }
  userRank(data?: Object) {//用户等级
    return this.http.get(IP + '/User/UserRank', data, { showLoading: false })
  }
  affirmReceived(data?: Object) {//确认收货
    return this.http.post(IP + '/User/affirm_received', data, { showLoading: false })
  }
  getWuLiu(data?: Object) {//订单物流
    return this.http.get(IP + '/User/shipping_log', data, { showLoading: true })
  }
  exchangeGoods(data?: Object) {//积分兑换列表
    return this.http.get(IP + '/User/exchangeGoods', data, { showLoading: true })
  }
  exchangeGoodsInfo(data?: Object) {//积分兑换详情
    return this.http.get(IP + '/User/exchangeGoodsInfo', data, { showLoading: true })
  }
  exchangebuy(data?: Object) {//兑换积分商品
    return this.http.get(IP + '/Flow/exchangebuy', data, { showLoading: false })
  }
  cancelOrder(data?: Object) {//取消订单
    return this.http.get(IP + '/User/cancel_order', data, { showLoading: false })
  }
  withdrawals(data?: Object) {//用户提现
    return this.http.get(IP + '/User/withdrawals', data, { showLoading: true })
  }
  goodsInfos(data?: Object) {//商品详情
    return this.http.get(IP + '/Goods/goods_infos', data, { showLoading: true })
  }
  forgotPwd(data?: Object) {//忘记密码
    return this.http.post(IP + '/Login/forgotPwd', data, { showLoading: true })
  }
  coupon(data?: Object) {//首页优惠券
    return this.http.get(IP + '/Index/coupon', data, { showLoading: true })
  }
  delOrder(data?: Object) {//删除订单
    return this.http.get(IP + '/User/del_order', data, { showLoading: true })
  }
  addAccount(data?: Object) {//充值
    return this.http.post(IP + '/User/addAccount', data, { showLoading: false })
  }
  getAccountPayList(data?: Object) {//充值新增转账付款方式
    return this.http.get(IP + '/User/getAccountPayList', data, { showLoading: false })
  }
  indexs(data?: Object) {//首页统一
    return this.http.get(IP + '/Index/indexs', data, { showLoading: false })
  }
  suppliersIndex(data?: Object) {//店铺首页
    return this.http.post(IP + '/Category/suppliers_index', data, { showLoading: true })
  }
  suppliersPromote(data?: Object) {//店铺促销
    return this.http.post(IP + '/Category/suppliers_promote_goods', data, { showLoading: false })
  }
  suppliersCategoryGoods(data?: Object) {//店铺促销
    return this.http.post(IP + '/Category/suppliers_category_goods', data, { showLoading: false })
  }
  orderRepair(data?: Object) {//售后申请列表
    return this.http.post(IP + '/User/order_repair', data, { showLoading: false })
  }
  repairApply(data?: Object) {//点击申请售后
    return this.http.post(IP + '/User/repair_apply', data, { showLoading: false })
  }
  submitRepair(data?: Object) {//3）提交返修退换货
    return this.http.post(IP + '/User/submit_repair', data, { showLoading: true })
  }
  fuwudan(data?: Object) {//4）填写快递单
    return this.http.post(IP + '/User/fuwudan', data, { showLoading: false })
  }
  repairList(data?: Object) {//5）返修单记录
    return this.http.post(IP + '/User/repair_list', data, { showLoading: false })
  }
  cancelReturn(data?: Object) {//6）取消售后
    return this.http.post(IP + '/User/cancel_return', data, { showLoading: false })
  }
  repairInfo(data?: Object) {//7）服务单详情
    return this.http.post(IP + '/User/repair_info', data, { showLoading: false })
  }
  CatrgorySupplierInfo(data?: Object) {//7）服务单详情
    return this.http.post(IP + '/Category/get_supplier_info', data, { showLoading: false })
  }
  changeSurplus(data?: Object) {//切换余额支付
    return this.http.post(IP + '/Flow/change_surplus', data, { showLoading: true })
  }
  clearFlowOrder(data?: Object) {//去结算使用余额
    return this.http.get(IP + '/Flow/clear_flow_order', data, { showLoading: false })
  }
  versionInfo(data?: Object) {//版本更新
    return this.http.get(IP + '/Login/version_info', data, { showLoading: false })
  }
  doublePayment(data?: Object) {//余额改版
    return this.http.get(IP + '/Flow/double_payment', data, { showLoading: true })
  }
  checkPayPass(data?: Object) {//支付密码
    return this.http.post(IP + '/Flow/check_pay_pass', data, { showLoading: true })
  }
  editPaypwd(data?: Object) {//修改密码
    return this.http.post(IP + '/User/edit_paypwd', data, { showLoading: true })
  }
  rechargeMoney(data?: Object) {//新充值
    return this.http.post(IP + '/User/recharge_money', data, { showLoading: true })
  }
  /**
   * 来镜加工 User/machining
   */
  machining(data?: Object) {
    return this.http.get(IP + '/User/machining', data, { showLoading: true })
  }
  /**
   * 申请加工
   * @param 
   */
  glassMachining(data?: Object) {
    return this.http.post(IP + '/Machining/glass_machining', data, { showLoading: true })
  }
  /**
   * 闪购
   * @param 
   */
  getCategoryPromote(data?: Object) {
    return this.http.post(IP + '/Index/getCategoryPromote', data, { showLoading: false })
  }
  /**
   * 预售
   * @param 
   */
  getCategoryPre(data?: Object) {
    return this.http.post(IP + '/Index/getCategoryPre', data, { showLoading: false })
  }
  /**
   * 再次购买加入购物车
   * @param 
   */
  alignBuy(data?: Object) {
    return this.http.post(IP + '/User/align_buy', data, { showLoading: true })
  }
  /**
   * 极验验证
   */
  geeTestinit(data?: Object) {
    return this.http.get(IP + '/Login/geeTestinit', data, { showLoading: false })
  }
  /**
   * 金融
   */
  Ximu(data?: Object) {
    return this.http.post(IP + '/Ximu', data, { showLoading: false })
  }
  /* 白条激活 */
  XimuUserapply(data?: Object) {
    return this.http.post(IP + '/Ximu/userapply', data, { showLoading: true })
  }
  /* 白条开通条件 */
  baitiao_b(data?: Object) {
    return this.http.post(IP + '/User/baitiao', data, { showLoading: true })
  }
  /* 白条是否开通状态 */
  loan_status(data?: Object) {
    return this.http.post(IP + '/User/loan_status', data, { showToast: false, showLoading: false })
  }
  /* 白条支付 */
  ximu_order(data?: {
    order_id: number | string;
  }) {
    return this.http.post(IP + '/Ximu/order', data, { showLoading: true })
  }
  /* 企业信息管理 */
  enterprise_info(data?: {
    company?: string | number;//企业名称
    province?: string | number;//省
    city?: string | number;//市
    district?: string | number;//区
    address?: string | number;//经营地址
    zctel?: string | number;//注册电话
    xk?: string | number;//银行开户许可证
    yyzzsn?: string | number;//营业执照编号
    fr?: string | number;//法人姓名
    code_sn?: string | number;//身份证号
    mobile?: string | number;//手机号
    medical?: string;//手机号
  }) {
    return this.http.post(IP + '/User/enterprise_info', data, { showLoading: true })
  }
  /* 企业信息管理 */
  get_enterprise_info(data?) {
    return this.http.get(IP + '/User/enterprise_info', data, { showLoading: true })
  }
  /* 白条支付是否完成 */
  ximuIsPay(data: { order_id }) {
    return this.http.post(IP + '/User/is_pay', data, { showLoading: false })
  }
  /**
   * 来镜加工详情
   */
  machiningInfo(data?: Object) {
    return this.http.post(IP + '/Machining/machining_info', data, { showLoading: true })
  }
  //点击选择镜片
  machining_goods(data: {
    order_id: any;//订单id
    type: string;//镜片类型   you （右眼）  zuo（左眼）
    goods_type: string;//商品类型  pian（镜片） jia（镜架）
    rec_ids?: Array<string>;
    rec_id?: Array<string>;
    pian_rec?: Array<string>;
  }) {
    return this.http.post(IP + '/Machining/machining_goods', data, { showLoading: true })
  }
  //确定选择镜片
  select_goods_type(data: {
    goods_rec?: any;//商品rec_id
    type: string;//商品类型   1 （镜片）  2（镜架）
    str_type: string;//镜片类型  you（右眼） zuo（左眼）
    mach_type?: string;//加工类型 0全框 1半框 2切边 3打孔
    pinpai?: string;//镜架品牌
    xinghao?: string;//镜架型号
    beizhu?: string;//镜架备注
  }) {
    return this.http.post(IP + '/Machining/select_goods_type', data, { showLoading: true })
  }
  //3)	判断还可以来镜加工单
  is_machining_goods(data: {
    order_id: string;
    rec_ids: Array<string>;
  }) {
    return this.http.post(IP + '/Machining/is_machining_goods', data, { showLoading: true })
  }
  //4)	生成来镜加工单缓存
  cache_machining(data?: Object) {
    return this.http.post(IP + '/Machining/cache_machining', data, { showLoading: true })
  }
  //缓存信息
  machining_cache_info(data: {
    order_id: string;
  }) {
    return this.http.post(IP + '/Machining/machining_cache_info', data, { showLoading: true })
  }
  //5)	生成来镜加工单
  insert_machining(data: {
    order_id: string;
  }) {
    return this.http.post(IP + '/Machining/insert_machining', data, { showLoading: true })
  }
  //订单是否支持来镜加工
  is_machining_order(data: {
    order_id: string;
  }) {
    return this.http.post(IP + '/User/is_machining_goods', data, { showToast: false })
  }
  /**
   * 申请售后
   */
  isGoodsRepair(data?: Object) {
    return this.http.post(IP + '/User/is_goods_repair', data, { showLoading: false })
  }
  /**
   * 退换返修
   */
  moreGoodsRepair(data?: Object) {
    return this.http.post(IP + '/User/more_goods_repair', data, { showLoading: false })
  }
  /**
   * 镜片属性价格
   */
  changeprice(data?: Object) {
    return this.http.post(IP + '/Goods/changeprice', data, { showLoading: false })
  }
  /**
   * 购物车商品属性
   */
  changeProductNum(data?: Object) {
    return this.http.post(IP + '/Flow/change_product_num', data, { showLoading: true })
  }
  /**
   * 购物车商品属性
   */
  get_flow_goods_number(data?: Object) {
    return this.http.post(IP + '/Flow/get_flow_goods_number', data, { showLoading: false })
  }
  /**
   * 微信分享
   */
  weixinfenx(data?: Object) {
    return this.http.post(IP + '/Login/weixinfenx', data, { showToast: false })
  }
  orderPayOver(data: {
    order_id: string | number
    log_id: string | number
    type: string | number
  }) {
    return this.http.post(IP + '/Flow/order_ok', data, { showToast: false })
  }
  editMedical(data?: Object) {
    return this.http.post(IP + '/user/edit_medical', data)
  }
  brank_number(data?: Object) {
    return this.http.post(IP + '/User/brank_number', data)
  }
  withdrawal(data?: Object) {
    return this.http.post(IP + '/User/withdrawal', data)
  }
  newArea(data?: Object) {//新新品专区
    return this.http.post(IP + '/index/newArea', data, { showLoading: true })
  }
  ads(data?: Object) {//index/ads     int_pos_id  广告位id  size 个数   is_app 1 
    return this.http.post(IP + '/index/ads', data)
  }
  cutting_info(data?: Object) {//切边商品详情
    return this.http.post(IP + '/Cutting/cutting_info', data)
  }
  cutting_list(data?: Object, options?: HttpOptions) {//切边列表
    return this.http.post(IP + '/Cutting/cutting_list', data, options)
  }
  get_goods_attribute(data?: Object) {//切边列表
    return this.http.post(IP + '/Cutting/get_goods_attribute', data, { showLoading: true })
  }
  add_to_cart_spec_cutting(data?: Object) {//切边列表
    return this.http.post(IP + '/Cutting/add_to_cart_spec_cutting', data)
  }
  staffIndex(data?: Object, options = {}) {//员工列表
    return this.http.post(IP + '/Staff/index', data, options)
  }
  staffAddUser(data?: Object) {//添加新员工
    return this.http.post(IP + '/Staff/add_user', data, { showLoading: true })
  }
  staffAddNow(data?: Object) {//选择现有成员
    return this.http.post(IP + '/Staff/add_now', data, { showLoading: true })
  }
  staffEditUser(data?: Object) {//选择现有成员
    return this.http.post(IP + '/Staff/edit_user', data, { showLoading: true })
  }
  staffEditUser_get(data?: Object) {//选择现有成员
    return this.http.get(IP + '/Staff/edit_user', data, { showLoading: true })
  }
  staffDelUser(data?: Object) {//选择现有成员
    return this.http.post(IP + '/Staff/del_user', data, { showLoading: true })
  }
  getCompanyList(data?: Object) {//选择现有成员
    return this.http.post(IP + '/Index/CompanyList', data, { showLoading: true })
  }
  SwitchCompany(data?: Object) {//选择现有成员
    return this.http.post(IP + '/Index/SwitchCompany', data, { showLoading: true })
  }
  category_goods_d(data?: Object, options: HttpOptions = { showLoading: true }) {//选择现有成员
    return this.http.post(IP + '/Distribution/category_goods', data, options)
  }
  info_d(data?: Object, options?: HttpOptions) {//选择现有成员
    return this.http.post(IP + '/Distribution/info', data, options)
  }
  get_goods_attribute_d(data?: Object, options?: HttpOptions) {//选择现有成员
    return this.http.post(IP + '/Distribution/get_goods_attribute', data, options)
  }
  checkout_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.post(IP + '/Distribution/checkout', data, options)
  }
  change_consignee_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.post(IP + '/Distribution/change_consignee', data, options)
  }
  select_payment_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.post(IP + '/Distribution/select_payment', data, options)
  }
  write_notes_d(data?: Object, options: HttpOptions = { showLoading: true }) {//选择现有成员
    return this.http.post(IP + '/Distribution/write_notes', data, options)
  }
  get_attr_list_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.post(IP + '/Distribution/get_attr_list', data, options)
  }
  done_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.post(IP + '/Distribution/done', data, options)
  }
  order_d(data?: Object, options: HttpOptions = { showLoading: false }) {//选择现有成员
    return this.http.get(IP + '/Distribution/orders', data, options)
  }
}
