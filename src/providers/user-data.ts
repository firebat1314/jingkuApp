import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Events, AlertController } from "ionic-angular";
import { Storage } from '@ionic/storage';

// Add the RxJS Observable operators.
import './rxjs-operators';

import { Native } from '../providers/native';

@Injectable()
export class UserData {

    constructor(
        private events: Events,
        private http: Http,
        private native: Native,
        private alertCtrl: AlertController,
        private storage: Storage,
    ) { }

    public get(url: string, paramObj?: any, showLoading?: boolean) {
        if (showLoading) {
            this.native.showLoading('', false);
        }
        return this.storage.get('token').then((res) => {
            var headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.get(url + this.toQueryString(paramObj), options)
                .timeout(7000)
                .toPromise()
                .then(res => this.handleSuccess(res.json(), showLoading))
                .catch(error => this.handleError(error, showLoading));
        })
    }
    public post(url: string, paramObj: any, showLoading?: boolean) {
        // this.native.showLoading();
        if (showLoading) {
            this.native.showLoading('', false);
        }
        return this.storage.get('token').then((res) => {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, paramObj, options)
                .timeout(7000)
                .toPromise()
                .then(res => this.handleSuccess(res.json(), showLoading))
                .catch(error => this.handleError(error, showLoading));
        })
    }
    public postBody(url: string, paramObj: any, showLoading?: boolean) {
        if (showLoading) {
            this.native.showLoading('', false);
        }
        return this.storage.get('token').then((res) => {
            let headers = new Headers();
            headers.append('Authorization', 'Basic ' + btoa(res + ':'));
            let options = new RequestOptions({ headers: headers });
            return this.http.post(url, this.toBodyString(paramObj), options)
                .timeout(7000)
                .toPromise()
                .then(res => this.handleSuccess(res.json(), showLoading))
                .catch(error => this.handleError(error, showLoading));
        })
    }
    /**
     * 请求成功处理函数
     * @param result
     * @return {any}
     */
    private handleSuccess(result, showLoading) {
        if (showLoading) {
            this.native.hideLoading();
        }
        if (result && !result.status || result.status == -1) {
            if (result.info != "获取商品参数") {
                this.native.showToast(result.info);
            }
        }
        return result;
    }
    /**
     * 请求失败处理函数
     * @param error
     * @return {{success: boolean, msg: string}}
     */
    private showToastTime = true;
    private handleError(error: Response | any, showLoading) {
        if (showLoading) {
            this.native.hideLoading();
        }
        let msg: string = '参数错误';
        if (error.status == 401) {
            msg = '数据加载出错';
            if (error.statusText == 'Unauthorized') {
                this.storage.set('hasLoggedIn', false)
                if (this.showToastTime) {
                    this.myAlert(msg);
                    setTimeout(function () {
                        this.showToastTime = true;
                    }, 10000);
                }
            }
        }
        if (error.status == 404) {
            this.native.showToast('服务器出错了，404');
        }

        if (error.status == 0) {
            this.native.showToast('请检查网络连接');
        }
        if(error.name == "TimeoutError"){
            this.native.showToast('连接超时，请稍后再试');
        }
        console.log(error);

        return { status: 0, info: msg };
    }
    myAlert(msg) {
        // this.native.showToast(msg);
        this.showToastTime = false;
        let alert = this.alertCtrl.create({
            title: '提示',
            subTitle: msg,
            enableBackdropDismiss: false,
            buttons: [{
                text: '确定',
                handler: () => {
                    this.events.publish('signOut');
                }
            }]
        });
        alert.present();
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
