import { Injectable } from '@angular/core';
import { ToastController, LoadingController, Platform, AlertController } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from '@ionic-native/image-picker';
import { CallNumber } from '@ionic-native/call-number';
import { Toast } from '@ionic-native/toast';
import { AppVersion } from '@ionic-native/app-version';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';

import { Transfer, FileUploadOptions, TransferObject } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

declare var LocationPlugin;
declare var AMapNavigation;
declare var cordova;

@Injectable()
export class Native {

	constructor(
		private platform: Platform,
		private toastCtrl: ToastController,
		private loadingCtrl: LoadingController,
		private alertCtrl: AlertController,
		private camera: Camera,
		private imagePicker: ImagePicker,
		private callNumber: CallNumber,
		private toast: Toast,
		private appVersion: AppVersion,
		private barcodeScanner: BarcodeScanner,
		private transfer: Transfer,
		private file: File,
	) {
		console.log(navigator.userAgent.toLowerCase())
	}

	/**
	 * 是否真机环境
	 * @return {boolean}
	 */
	isMobile() {
		return this.platform.is('mobile') && !this.platform.is('mobileweb');/* */
	}
	isMobileweb() {
		return this.platform.is('mobileweb');
	}
	/**
	 * 是否android真机环境
	 * @return {boolean}
	 */
	isAndroid() {
		return this.isMobile() && this.platform.is('android');
	}
	isWeixin() {
		var ua = navigator.userAgent.toLowerCase();
		if(ua.match(/MicroMessenger/i)){
			return ua.match(/MicroMessenger/i)[0] == "micromessenger";
		}
	}
	/**
	 * 是否ios真机环境
	 * @return {boolean}
	 */
	isIos() {
		return this.isMobile() && (this.platform.is('ios') || this.platform.is('ipad') || this.platform.is('iphone'));
	}

	/**
	 * 统一调用此方法显示提示信息
	 * @param message 信息内容
	 * @param duration 显示时长
	 */
	showToastTime: boolean = true;

	showToast = (message: string, duration?: number, useNative?: boolean) => {
		if (this.showToastTime) {
			if (useNative === true && this.isMobile()) {
				this.toast.show(message, '1500', 'center').subscribe((toast) => {
					console.log(toast);
				});
			} else {
				this.toastCtrl.create({
					message: message,
					duration: duration || 1500,
					position: 'top',
					showCloseButton: false
				}).present();
			}
			this.showToastTime = false;
			setTimeout(() => {
				this.showToastTime = true;
			}, 2000);
		}
		console.log(message);
	};
	/**
	 * 统一调用此方法显示loading
	 * @param content 显示的内容
	 */
	private loading;
	showLoading = (content: string = '', showBackdrop: boolean = false) => {
		this.loading = this.loadingCtrl.create({
			content: content,
			showBackdrop: showBackdrop,
			enableBackdropDismiss: false,
			cssClass: 'loading-style',
			spinner: 'circles',
			dismissOnPageChange: false
		});
		this.loading.present();
	};
	/**
	 * 关闭loading
	 */
	hideLoading = () => {
		this.loading.dismissAll();
	};
	/**
	 * 手机拨号
	 */
	openCallNumber(numberToCall, bypassAppChooser) {
		this.callNumber.callNumber(numberToCall, bypassAppChooser)
			.then(() => console.log('Launched dialer!'))
			.catch(() => console.log('Error launching dialer'));
	}
	/**
	 * 确认弹窗
	 */
	openAlertBox(title, confirmHandler, cancelHandler?, didDismiss?) {
		let confirm = this.alertCtrl.create({
			cssClass: 'alert-style',
			title: title,
			buttons: [
				{
					text: '确认',
					handler: () => {
						confirmHandler()
					}
				}, {
					text: '取消',
					handler: () => {
						if (cancelHandler) { cancelHandler(); }
					}
				}
			],
		});
		confirm.present();
		confirm.onDidDismiss(() => {
			return didDismiss ? didDismiss() : null;
		})
	}
	/**
	 * 使用 cordova-plugin-camera 获取照片的base64
	 * @param options
	 * @return {Promise<T>}
	 */
	getPicture = (options):Promise<any> => {
		return new Promise((resolve, reject) => {
			this.camera.getPicture(Object.assign({
				sourceType: this.camera.PictureSourceType.CAMERA,//图片来源,CAMERA:拍照,PHOTOLIBRARY:相册
				destinationType: this.camera.DestinationType.DATA_URL,
				//默认返回base64字符串,DATA_URL:base64   FILE_URI:图片路径
				quality: 70,//图像质量，范围为0 - 100
				allowEdit: false,//选择图片前是否允许编辑
				encodingType: this.camera.EncodingType.JPEG,
				targetWidth: 800,//缩放图像的宽度（像素）
				targetHeight: 800,//缩放图像的高度（像素）
				saveToPhotoAlbum: false,//是否保存到相册
				correctOrientation: true//设置摄像机拍摄的图像是否为正确的方向
			}, options)).then((imgData) => {
				resolve(imgData);
			}, (err) => {
				console.log(err);
				err == 20 ? this.showToast('没有权限,请在设置中开启权限') : reject(err);
			});
		});
	};

	/**
	 * 通过拍照获取照片
	 * @param options
	 * @return {Promise<T>}
	 */
	getPictureByCamera = (options = {}):Promise<any> => {
		return new Promise((resolve) => {
			this.getPicture(Object.assign({
				sourceType: this.camera.PictureSourceType.CAMERA,
			}, options)).then(imgData => {
				resolve(imgData);
			}).catch(err => {
				String(err).indexOf('No Image Selected') != -1 ? this.showToast('取消拍照', 1500) : this.showToast('获取照片失败');
			});
		});
	};

	/**
	 * 通过图库获取照片
	 * @param options
	 * @return {Promise<T>}
	 */
	getPictureByPhotoLibrary = (options = {}):Promise<any> => {
		return new Promise((resolve) => {
			this.getPicture(Object.assign({
				sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
			}, options)).then(imgData => {
				resolve(imgData);
			}).catch(err => {
				String(err).indexOf('No Image Selected') != -1 ? this.showToast('取消选择图片', 1500) : this.showToast('获取照片失败');
			});
		});
	};


	/**
	 * 通过图库多选图片
	 * @param options
	 * @return {Promise<T>}
	 */
	getMultiplePicture = (options = {}):Promise<any> => {
		// let that = this;
		// let destinationType = options['outputType'] || 0;//0:base64字符串,1:图片url
		return new Promise((resolve, reject) => {
			this.imagePicker.getPictures(Object.assign({
				maximumImagesCount: 5,
				// width: 800,//缩放图像的宽度（像素）
				// height: 800,//缩放图像的高度（像素）
				// quality: 90,//图像质量，范围为0 - 100
				outputType: 1,// defaults to 0 (FILE_URI)
			}, options)).then(files => {
				resolve(files);
				/* if (destinationType === 1) {
					resolve(files);
				} else {
					let imgBase64s = [];//base64字符串数组
					for (let fileUrl of files) {
						that.convertImgToBase64(fileUrl, base64 => {
							imgBase64s.push(base64);
							if (imgBase64s.length === files.length) {
								resolve(imgBase64s);
							}
						}, null);
					}
				} */
			}).catch(err => {
				reject(err);
				this.showToast('获取照片失败');
			});
		});
	};

	// 根据图片绝对路径转化为base64字符串
	convertImgToBase64(url, callback, outputFormat) {
		let canvas = <HTMLCanvasElement>document.createElement('CANVAS'), ctx = canvas.getContext('2d'), img = new Image;
		img.crossOrigin = 'Anonymous';
		img.onload = function () {
			canvas.height = img.height;
			canvas.width = img.width;
			ctx.drawImage(img, 0, 0);
			let imgBase64 = canvas.toDataURL(outputFormat || 'image/png');//返回如'data:image/jpeg;base64,abcdsddsdfsdfasdsdfsdf'
			let base64 = imgBase64.substring(imgBase64.indexOf(';base64,') + 8);//返回如'abcdsddsdfsdfasdsdfsdf'
			callback.call(this, base64);
			canvas = null;
		};
		img.src = url;
	}
	/**
	 * 上传文件
	 */
	fileTransfer: TransferObject = this.transfer.create();
	// full example
	upload(fileurl, apiurl, params) {
		let options: FileUploadOptions = {
			fileKey: 'file',
			fileName: '',
			headers: {
				Authorization: 'Basic ' + btoa(localStorage.getItem('token') + ':')
			},
			params: params
		}
		return this.fileTransfer.upload(fileurl, apiurl, options)

	}
	download() {
		const url = 'http://www.example.com/file.pdf';
		this.fileTransfer.download(url, this.file.dataDirectory + 'file.pdf').then((entry) => {
			console.log('download complete: ' + entry.toURL());
		}, (error) => {
			// handle error
		});
	}
	/**
	 * 获得用户当前坐标
	 * @return {Promise<T>}
	 */
	getUserLocation() {
		return new Promise((resolve, reject) => {
			if (this.isMobile()) {
				LocationPlugin.getLocation(data => {
					resolve({ 'lng': data.longitude, 'lat': data.latitude });
				}, msg => {
					console.error('定位错误消息' + msg);
					alert(msg.indexOf('缺少定位权限') == -1 ? ('错误消息：' + msg) : '缺少定位权限，请在手机设置中开启');
					reject('定位失败');
				});
			} else {
				console.log('非手机环境,即测试环境返回固定坐标');
				resolve({ 'lng': 113.350912, 'lat': 23.119495 });
			}
		});
	}

	/**
	 * 地图导航
	 * @param startPoint 开始坐标
	 * @param endPoint 结束坐标
	 * @param type 0实时导航,1模拟导航,默认为模拟导航
	 * @return {Promise<T>}
	 */
	navigation(startPoint, endPoint, type = 1) {
		return new Promise((resolve, reject) => {
			if (this.platform.is('mobile') && !this.platform.is('mobileweb')) {
				AMapNavigation.navigation({
					lng: startPoint.lng,
					lat: startPoint.lat
				}, {
						lng: endPoint.lng,
						lat: endPoint.lat
					}, type, function (message) {
						resolve(message);//非手机环境,即测试环境返回固定坐标
					}, function (message) {
						alert('导航失败:' + message);
						reject('导航失败');
					});
			} else {
				this.showToast('非手机环境不能导航');
			}
		});
	}

	/**
	 *  @name 获取app版本信息demo
	 */
	showAppVersion() {
		this.appVersion.getAppName().then(value => {
			console.log(value);//ionic2_tabs
		});
		this.appVersion.getPackageName().then(value => {
			console.log(value);//com.kit.platform
		});
		this.appVersion.getVersionCode().then(value => {
			console.log(value);//1
		});
		this.appVersion.getVersionNumber().then(value => {
			console.log(value);//0.0.1
		});
	}
	/**
	 * @name 获得app版本号,如0.01
	 * @description 对应/config.xml中version的值
	 * @returns {Promise<string>}
	 */
	getVersionNumber(): Promise<string> {
		return new Promise((resolve) => {
			this.appVersion.getVersionNumber().then((value) => {
				console.log('Version', value)
				resolve(value);
			}).catch(err => {
				console.log('getVersionNumber:' + err);
			});
		});
	}
	/**
	 * @name 获取网络类型
	 */
	getNetworkType() {
		if (!this.isMobile()) {
			return true;
		}
		return navigator['connection']['type'];// "none","wifi","4g","3g","2g"...
	}
	isConnecting() {
		return this.getNetworkType() != 'none';
	}
	/**
	 * @name 支付宝支付
	 */

	/**
	 * @name 微信支付
	 */
	/**
	 * @name 二维码扫描
	 */
	openBarcodeScanner() {
		return new Promise((resolve, reject) => {
			this.barcodeScanner.scan().then((barcodeData) => {
				// Success! Barcode data is here
				resolve(barcodeData);
			}, (err) => {
				// An error occurred
				reject()
			});
		})
		/* return new Promise((resolve, reject) => {
			cordova.plugins.barcodeScanner.scan(
				(result) => {
					console.log("We got a barcode\n" +
						"Result: " + result.text + "\n" +
						"Format: " + result.format + "\n" +
						"Cancelled: " + result.cancelled);
					resolve(result);
				},
				(error) => {
					console.log("Scanning failed: " + error);
					reject(error);
				}
			);
		}) */
	}




}
