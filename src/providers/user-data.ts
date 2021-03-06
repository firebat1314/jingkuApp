import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Events, AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { Native } from '../providers/native';

export interface HttpOptions {
    showLoading?: boolean;
    timeout?: number;
    showToast?: boolean;
}

@Injectable()
export class UserData {

    constructor(
        private events: Events,
        private http: Http,
        private native: Native,
        private alertCtrl: AlertController,
        private storage: Storage,
    ) { }

    public get(url: string, paramObj?: any, option?: HttpOptions) {
        var op = Object.assign({
            showLoading: false,
            timeout: 20000,
            showToast: true
        }, option);
        if (op.showLoading) this.native.showLoading();
        return this.storage.get('token').then((res) => {
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.get(url + this.toQueryString(paramObj), options)
                .timeout(op.timeout)
                .toPromise()
                .then(res => {
                    var result = res.json();
                    if (op.showLoading) this.native.hideLoading();
                    if (result && result.status == 0 && op.showToast) {
                        this.native.showToast(result.info);
                    }
                    return result;
                })
                .catch(error => this.handleError(error, op));
        })
    }
    public post(url: string, paramObj: any, option?: HttpOptions) {
        var op = Object.assign({
            showLoading: false,
            timeout: 20000,
            showToast: true
        }, option);

        if (op.showLoading) this.native.showLoading();
        return this.storage.get('token').then((res) => {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, paramObj, options)
                .timeout(op.timeout)
                .toPromise()
                .then(res => {
                    var result = res.json();
                    if (op.showLoading) this.native.hideLoading();
                    if (result && result.status == 0 && op.showToast) {
                        this.native.showToast(result.info);
                    }
                    return result;
                })
                .catch(error => this.handleError(error, op));
        })
    }
    public postBody(url: string, paramObj: any, option?: HttpOptions) {
        var op = Object.assign({
            showLoading: false,
            timeout: 20000,
            showToast: true
        }, option);
        if (op.showLoading) this.native.showLoading();
        return this.storage.get('token').then((res) => {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, this.toBodyString(paramObj), options)
                .timeout(op.timeout)
                .toPromise()
                .then(res => {
                    var result = res.json();
                    if (op.showLoading) this.native.hideLoading();
                    if (result && result.status == 0 && op.showToast) {
                        if (result.info != "获取商品参数") {
                            this.native.showToast(result.info);
                        }
                    }
                    return result;
                })
                .catch(error => this.handleError(error, op));
        })
    }
    /**
     * 请求成功处理函数
     * @param result
     * @return {any}
     */
    /* private handleSuccess(result, showLoading) {
        if (!showLoading) this.native.hideLoading();
        if (result && !result.status || result.status == -1) {
            if (result.info != "获取商品参数") {
                this.native.showToast(result.info);
            }
        }
        return result;
    } */
    /**
     * 请求失败处理函数
     * @param error
     * @return {{success: boolean, msg: string}}
     */
    private showToastTime = true;
    private handleError(error: Response | any, op) {
        if (op.showLoading) this.native.hideLoading();
        let msg: string = '参数错误';
        if (error.status == 401) {
            msg = '数据加载出错';
            if (error.statusText == 'Unauthorized') {
                msg = '登录异常，请重新登录';
                if (this.showToastTime) {
                    this.showToastTime = false;
                    this.events.publish('signOut');
                    setTimeout(() => {
                        this.showToastTime = true;
                    }, 3000);
                }
            }
        }
        if (error.status == 404 && op.showToast) {
            this.native.showToast('连接出错，请稍后再试');
        }
        if (error.status == 500 && op.showToast) {
            this.native.showToast('500');
        }
        if (error.status == 0 && op.showToast) {
            this.native.showToast('请检查网络连接');
        }
        if (error.name == "TimeoutError" && op.showToast) {
            this.native.showToast('连接超时，请稍后再试');
        }
        console.log(error);

        return { status: 0, info: msg };
    }
    myAlert(msg, callback: Function = null) {
        // this.native.showToast(msg);
        this.showToastTime = false;
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            enableBackdropDismiss: false,
            buttons: [{
                text: '确定',
                handler: () => {
                    callback()
                }
            }]
        });
        return alert.present();
    }
    /*private handleError(error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }*/
    /**
    * 把请求参数转化为参数字符串
    * @param obj　参数对象
    * @return {string}　参数字符串
    * @example
    *  声明: var obj= {'name':'小军',age:23};
    *  调用: toQueryString(obj);
    *  返回: "?name=%E5%B0%8F%E5%86%9B&age=23"
    */
    private toQueryString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return '?' + ret.join('&');
    }
    /**
     *把请求参数转化为参数字符串
     * @param obj
     * @return {string}
     *  声明: var obj= {'name':'小军',age:23};
     *  调用: toQueryString(obj);
     *  返回: "name=%E5%B0%8F%E5%86%9B&age=23"
     */
    private toBodyString(obj) {
        let ret = [];
        for (let key in obj) {
            key = encodeURIComponent(key);
            let values = obj[key];
            if (values && values.constructor == Array) {//数组
                let queryValues = [];
                for (let i = 0, len = values.length, value; i < len; i++) {
                    value = values[i];
                    queryValues.push(this.toQueryPair(key, value));
                }
                ret = ret.concat(queryValues);
            } else { //字符串
                ret.push(this.toQueryPair(key, values));
            }
        }
        return ret.join('&');
    }

    private toQueryPair(key, value) {
        if (typeof value == 'undefined') {
            return key;
        }
        return key + '=' + encodeURIComponent(value === null ? '' : String(value));
    }
}
