import { Injectable } from "@angular/core";
import { Http, Response } from "@angular/http";
import { Events } from "ionic-angular";
import { Storage } from '@ionic/storage';
// Add the RxJS Observable operators.
import '../app/rxjs-operators';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class UserData {
    HAS_LOGGED_IN = "hasLoggedIn";
    private hasLogin = false;
    private ip = 'http://v401app.jingkoo.net';  // URL to web API
    private url = '/Login/index';  // URL to web API

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }
    private handleError(error: Response | any) {
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
    }
    constructor(
        private events: Events,
        private http: Http,
        public storage: Storage
    ) { }

    login(user) {
        let payload = {
            username: user.username,
            password: user.password
        };
        let self = this;
        this.http.post(this.ip + this.url, payload)
            .map(this.extractData)
            .catch(this.handleError)
            .subscribe(
            data => {
                console.log(data)
                if (data.status == 1) {
                    self.setUsername(user.username);
                    self.setToken(data.data.token);
                    self.storage.set(this.HAS_LOGGED_IN, true);
                    self.hasLogin = true;
                    self.events.publish("user:login", user.username);
                }
            },
            error => {
                self.events.publish("user:login:error");
            }
            );
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
        return this.http.post(this.ip + "/Login/register/step/one", payload)
            .map(this.extractData)
            .catch(this.handleError)
            
    }

    getVerificationImg(data) {
        console.log(data)
        return this.http.post(this.ip + '/Login/verify', data)
            .map(this.extractData)
            .catch(this.handleError)
            
    }

    getMobileCode(data){
        console.log(data)
        return this.http.post(this.ip + '/Login/getMobileCode', data)
            .map(this.extractData)
            .catch(this.handleError)
            
    }

    logout() {
        this.storage.remove(this.HAS_LOGGED_IN);
        this.storage.remove("token");
        this.storage.remove("username");
        this.events.publish("user:logout");
    }

    setToken(token) {
        this.storage.set("token", token);
    }

    getToken() {
        return this.storage.get("token").then((value) => {
            return value;
        });
    }

    setUsername(username) {
        this.storage.set("username", username);
    }

    getUsername() {
        return this.storage.get("username").then((value) => {
            return value;
        });
    }

    isLogin() {
        return this.hasLogin;
    };

    // return a promise
    hasLoggedIn() {
        let self = this;
        return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
            self.hasLogin = value === "true";
            return self.hasLogin;
        });
    }
}
