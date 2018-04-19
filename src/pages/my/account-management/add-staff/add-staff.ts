import { Component } from '@angular/core';
import { NavController, NavParams, IonicPage, ActionSheetController, AlertController } from 'ionic-angular';

/**
 * Generated class for the AddStaffPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-add-staff',
	templateUrl: 'add-staff.html',
})
export class AddStaffPage {

	accessLabel: string;
	access: any;
	post: any = 'web前端';
	constructor(public navCtrl: NavController, public navParams: NavParams, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
	}

	ionViewDidLoad() {
		console.log('ionViewDidLoad AddStaffPage');
	}

	ionViewCanEnter() {
		return this.choosePost().then((data) => {
			return true
		}).catch(data => {
			return false
		})
	}

	choosePost() {
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
					this.post = data;
					resolve(data)
				}
			});
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
				type: 'radio',
				label: item.label,
				value: item.value,
				checked: this.access == item.value
			});
		}
		alert.addButton('取消');
		alert.addButton({
			text: '确定',
			handler: data => {
				this.access = data;
				for (let i = 0; i < arr.length; i++) {
					const item = arr[i];
					if (arr[i].value == data) {
						this.accessLabel = arr[i].label
					}
				}
			}
		});
		alert.present();
	}
}
