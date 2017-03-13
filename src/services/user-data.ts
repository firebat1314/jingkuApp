import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions } from "@angular/http";
import { Events, AlertController,App } from "ionic-angular";
import { Storage } from '@ionic/storage';

// Add the RxJS Observable operators.
import '../app/rxjs-operators';

import { Observable } from 'rxjs/Observable';
import { Native } from '../providers/native';
import { LoginPage } from "../pages/login/login";

@Injectable()
export class UserData {
    public HAS_LOGGED_IN = "hasLoggedIn";
    public hasLogin = false;
    private ip = 'http://v401app.jingkoo.net';  // URL to web API
    private showToastTime = true;

    constructor(
        private events: Events,
        private http: Http,
        public storage: Storage,
        private native: Native,
        private alertCtrl: AlertController,
        public appCtrl: App
    ) { }

    login(payload) {

        return this.post(this.ip + '/Login/index', payload);
    }

    signupFirst(user) {
        let payload = {
            user_name: user.user_name,
            password: user.password,
            cpassword: user.cpassword,
            str_verify: user.str_verify,
            mobile_phone: user.mobile_phone,
            Phone_code: user.Phone_code
        };
        return this.post(this.ip + "/Login/register/step/one", payload)

    }

    getVerificationImg(data) {
        console.log(data)
        return this.post(this.ip + '/Login/verify', data)
    }

    getMobileCode(data) {
        return this.post(this.ip + '/Login/getMobileCode', data)
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
        this.storage.get(key);
    }

    public get(url: string, paramObj?: any) {
        let userToken = localStorage.getItem('token');

        // this.native.showLoading();
        var headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userToken + ':'));
        let options = new RequestOptions({ headers: headers });
        return this.http.get(url + this.toQueryString(paramObj), options)
            .toPromise()
            .then(res => this.handleSuccess(res.json()))
            .catch(error => this.handleError(error));
    }
    public post(url: string, paramObj: any) {
        let userToken: string = localStorage.getItem('token');

        // this.native.showLoading();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userToken + ':'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, paramObj, options)
            .toPromise()
            .then(res => this.handleSuccess(res.json()))
            .catch(error => this.handleError(error));
    }
    public postBody(url: string, paramObj: any) {
        let userToken = localStorage.getItem('token');

        // this.native.showLoading();
        let headers = new Headers();
        headers.append('Authorization', 'Basic ' + btoa(userToken + ':'));
        let options = new RequestOptions({ headers: headers });
        return this.http.post(url, this.toBodyString(paramObj), options)
            .toPromise()
            .then(res => this.handleSuccess(res.json()))
            .catch(error => this.handleError(error));
    }
    /**
     * 请求成功处理函数
     * @param result
     * @return {any}
     */
    private handleSuccess(result) {
        // this.native.hideLoading();
        if (result && !result.status) {
            this.native.showToast(result.info);
        }
        return result;
    }
    /**
     * 请求失败处理函数
     * @param error
     * @return {{success: boolean, msg: string}}
     */
    private handleError(error: Response | any) {
        // this.native.hideLoading();
        let msg: string = '请求失败';
        if (error.status == 401) {
            msg = '用户失效，请重新登陆';
           
            console.log('账号登陆异常');
        }
        console.log(error);
        if (this.showToastTime) {
            this.native.showToast(msg);
            this.showToastTime = false;
             let alert = this.alertCtrl.create({
                title: '提示',
                subTitle: '用户失效，请重新登陆',
                buttons: [{
                    text: '确定',
                    handler: () => {
                        let navTransition = alert.dismiss();
                        navTransition.then(() => {
                            // this.appCtrl.getRootNav().push(LoginPage);
                        });
                    }
                }],
                enableBackdropDismiss: false
            });
            alert.present();
            setTimeout(() => this.showToastTime = true, 2000);
        }

        return { success: false, msg: msg };
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
