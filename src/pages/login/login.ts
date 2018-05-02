import { Component, ElementRef } from '@angular/core';

import { NavController, NavParams, Events, ToastController, IonicPage, AlertController } from 'ionic-angular';

import { HttpService } from "../../providers/http-service";

/*
  Generated class for the Login page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@IonicPage()
@Component({
	selector: 'page-login',
	templateUrl: 'login.html'
})
export class LoginPage {
	accessLabel: any;
	access: any;
	private loginInfo: { username?: string, password?: string } = {};
	private signedName: String;

	constructor(
		private navCtrl: NavController,
		private navParams: NavParams,
		private events: Events,
		private alertCtrl: AlertController,
		private toastCtrl: ToastController,
		private httpService: HttpService,
		private ele: ElementRef,
	) {
		this.signedName = navParams.get('username');
		this.httpService.getUsername().then((data) => { this.loginInfo.username = this.signedName || data || '' })
	}
	ionViewDidLoad() {
		console.log('ionViewDidLoad LoginPage')
	}
	goToHome(form) {
		this.httpService.loginCompany({ username: this.ele.nativeElement.querySelector('input[name=username]').value, password: this.ele.nativeElement.querySelector('input[name=loginpassword]').value }).then(res => {
			if (res.status == 1) {
				let alert = this.alertCtrl.create();
				alert.setTitle('请选择公司');
				let arr = res.company;
				for (let i = 0; i < arr.length; i++) {
					const item = arr[i];
					alert.addInput({
						type: 'radio',
						label: item.cname,
						value: item.cid,
						checked: this.access == item.cid
					});
				}
				alert.addButton('取消');
				alert.addButton({
					text: '确定',
					handler: cid => {
						this.access = cid;
						console.log(cid)
						this.httpService.login({ username: this.ele.nativeElement.querySelector('input[name=username]').value, password: this.ele.nativeElement.querySelector('input[name=loginpassword]').value, cid: cid }).then(data => {
							// console.log(data)
							if (data.status == 1) {
								this.httpService.setStorage('token', data.data.token);
								this.httpService.setStorage('hasLoggedIn', true);
								this.httpService.setStorage('username', data.data.user_name);
								this.httpService.setStorage('login_info', data);

								let toast = this.toastCtrl.create({
									message: "欢迎回来，" + data.data.user_name || this.loginInfo.username,
									duration: 2000,
									position: "top"
								});
								setTimeout(() => {
									this.navCtrl.setRoot('TabsPage', {}, { animate: true, direction: 'forward' }).then(() => {
										toast.present();
									});
								}, 100);
							} else if (data.status == -1) {
								this.alertCtrl.create({
									title: '镜库科技',
									message: data.info,
									buttons: [
										{
											text: '拨打电话',
											handler: () => {
												location.href = "tel:" + data.phone;
											}
										},
										{
											text: '确定',
										}
									]
								}).present();
							}else if(data.status == -2){
								this.alertCtrl.create({
									title: '请绑定企业信息',
									message: data.info,
									buttons: [
										{
											text: '取消',
										}
									]
								}).present();
							}
						})
					}
				});
				alert.present();
			}
		})
	}
}
