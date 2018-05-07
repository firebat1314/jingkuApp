import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, AlertController, ToastController, Events } from 'ionic-angular';
import { StrVerifyComponent } from '../../../../components/str-verify/str-verify';
import { HttpService } from '../../../../providers/http-service';

/**
 * Generated class for the AddStaffPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage({
	segment: 'add-staff/:userId/:role'
})
@Component({
	selector: 'page-add-staff',
	templateUrl: 'add-staff.html',
})
export class AddStaffPage {

	mobile_phone: any;
	accessLabels: any;
	userInfo: any;
	type: any = this.navParams.get('role');//注册新账号||添加已有账号，立即验证
	userId = this.navParams.get('userId');//y员工id

	formData = {
		true_name: null,
		position: null,
		user_name: null,
		mobile_phone: null,
		str_verify: null,
		phone_code: null,
		password: null,
		cpassword: null,
		authority: [],
		staff_status: false
	}

	constructor(
		public navCtrl: NavController,
		public navParams: NavParams,
		public actionSheetCtrl: ActionSheetController,
		public alertCtrl: AlertController,
		public httpServ: HttpService,
		public toastCtrl: ToastController,
		public events: Events,
	) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddStaffPage');
	}

	/* ionViewCanEnter() {
		if (this.userId > 0) {
			return true
		}
		return this.getType().then((data) => {
			return true
		}).catch(data => {
			return false
		})
	} */
	ngOnInit() {
		this.events.subscribe('staff:access', (data) => {
			console.log(data)
			this.formData.authority = data;
		})
		if (this.userId > 0) {
			this.httpServ.staffEditUser_get({ user_id: this.userId }).then(res => {
				if (res.status) {
					this.userInfo = res;
					this.formData.mobile_phone = res.data.mobile_phone;
					this.formData.position = res.data.position;
					this.formData.true_name = res.data.true_name;
					this.formData.user_name = res.data.user_name;
					this.formData.authority = res.data.authority || [];
					this.formData.staff_status = res.data.is_checks==1?true:false;
				}
			})
		}
	}
	ngOnDestroy() {
		this.events.unsubscribe('staff:access')
	}
	save() {
		if (this.userId > 0) {
			this.httpServ.staffEditUser({
				user_id: this.userId,
				mobile_phone: this.formData.mobile_phone,
				position: this.formData.position,
				true_name: this.formData.true_name,
				user_name: this.formData.user_name,
				authority: this.formData.authority,
				staff_status: this.formData.staff_status
			}).then(res => {
				if (res.status) {
					this.navCtrl.pop()
						.then(res => {
							this.toastCtrl.create({
								message: '保存成功',
								duration: 2000,
								position: 'top',
								showCloseButton: false,
								closeButtonText: 'X'
							}).present().then(res => {
								this.events.publish('staff:save')
							});
						})
						.catch(res => { history.back() });
				}
			})
		}
		else if (this.type == 'new') {
			this.httpServ.staffAddUser(this.formData).then(res => {
				if (res.status) {
					this.navCtrl.pop()
						.then(res => {
							this.toastCtrl.create({
								message: '保存成功',
								duration: 2000,
								position: 'top',
								showCloseButton: false,
								closeButtonText: 'X'
							}).present().then(res => {
								this.events.publish('staff:save')
							});
						})
						.catch(res => { history.back() });
				}
			})
		}
		else if (this.type == 'yet') {
			this.httpServ.staffAddNow({
				user_id: this.userInfo.data.user_id,
				step: 'two',
				mobile_phone: this.formData.mobile_phone,
				position: this.formData.position,
				true_name: this.formData.true_name,
				user_name: this.formData.user_name,
				authority: this.formData.authority,
				str_verify: this.formData.str_verify,
				phone_code: this.formData.phone_code,
				staff_status: this.formData.staff_status
			}).then(res => {
				if (res.status) {
					this.navCtrl.pop()
						.then(res => {
							this.toastCtrl.create({
								message: '保存成功',
								duration: 2000,
								position: 'top',
								showCloseButton: false,
								closeButtonText: 'X'
							}).present().then(res => {
								this.events.publish('staff:save')
							});
						})
						.catch(res => { history.back() });
				}
			})
		}
	}
	next() {//当添加已有员工时显示下一步，通过用户名搜索用户信息
		this.httpServ.staffAddNow({ step: 'one', user_name: this.formData.user_name }).then(res => {
			if (res.status) {
				this.userInfo = res;
				// this.mobile_phone = res.data.mobile_phone?res.data.mobile_phone.substring(0,3)+"****"+res.data.mobile_phone.substring(7,11):'无';
				this.formData.mobile_phone = res.data.mobile_phone;
				this.formData.true_name = res.data.true_name;
				this.formData.user_name = res.data.user_name;
			}
		});
	}
	choosePost() {
		if (this.userId > 0 && this.userInfo.data.is_myself == 1) {
			return this.toastCtrl.create({
				message: '不能编辑自己的职务',
				duration: 2000,
				position: 'top',
				showCloseButton: false,
			}).present();
		}
		let actionSheet = this.actionSheetCtrl.create({
			buttons: [
				{
					text: '老板',
					handler: () => {
						actionSheet.dismiss('老板');
						return false;
					}
				},
				{
					text: '财务',
					handler: () => {
						actionSheet.dismiss('财务');
						return false;
					}
				},
				{
					text: '采购经理',
					handler: () => {
						actionSheet.dismiss('采购经理');
						return false;
					}
				},
				{
					text: '店长',
					handler: () => {
						actionSheet.dismiss('店长');
						return false;
					}
				},
				{
					text: '店员',
					handler: () => {
						actionSheet.dismiss('店员');
						return false;
					}
				},
				{
					text: '其他',
					role: 'destructive',
					handler: () => {
						this.showPrompt().then((res) => {
							actionSheet.dismiss(res);
						}).catch(res => {
							console.log(res)
						});
						return false;
					}
				},
				{
					text: '取消',
					role: 'cancel',
					handler: () => {
						console.log('Cancel clicked');
					}
				}
			]
		});
		actionSheet.present();
		return new Promise((resolve, reject) => {
			actionSheet.onDidDismiss((data, role) => {
				if (role == 'cancel') {
					reject(data)
				} else {
					this.formData.position = data;
					resolve(data)
				}
			});
		}).then(res => {
			return res
		}).catch(res => {
			return res
		})
	}
	showPrompt(): Promise<any> {
		let prompt = this.alertCtrl.create({
			title: '输入职务',
			inputs: [{
				name: 'post',
				placeholder: '职务'
			},],
			buttons: [{
				text: '取消',
				role: '0',
				handler: data => {
					prompt.dismiss(data, '0');
					return false;
				}
			}, {
				text: '确定',
				handler: data => {
					prompt.dismiss(data, '1');
					return false;
				}
			}]
		});
		prompt.present();
		return new Promise((resolve, reject) => {
			prompt.onDidDismiss((data, role) => {
				if (role == '1') {
					resolve(data.post)
				} else {
					reject(data.post)
				}
			});
		})
	}
	chooseAccess() {
		let alert = this.alertCtrl.create();
		alert.setTitle('权限管理');

		let arr = [
			{ 'label': '允许查看价格', 'value': '1' },
			{ 'label': '允许结算', 'value': '2' },
			{ 'label': '允许添加员工', 'value': '3' },
			{ 'label': '允许查看员工信息', 'value': '4' },
		]
		for (let i = 0; i < arr.length; i++) {
			const item = arr[i];
			alert.addInput({
				type: 'checkbox',
				label: item.label,
				value: item.value,
				checked: this.hasValue(item.value)
			});
		}
		alert.addButton('取消');
		alert.addButton({
			text: '确定',
			handler: data => {
				this.formData.authority = data;
				this.accessLabels = [];
				for (let i = 0; i < arr.length; i++) {
					for (let j = 0; j < this.formData.authority.length; j++) {
						const ele = this.formData.authority[j];
						if (arr[i].value == ele) {
							this.accessLabels.push(arr[i].label)
						}
					}
				}
				this.accessLabels = this.accessLabels.join('\n')
			}
		});
		alert.present();
	}
	hasValue(value) {
		for (let i = 0; i < this.formData.authority.length; i++) {
			if (this.formData.authority[i] == value)
				return true;
		}
		return false;
	}
}
