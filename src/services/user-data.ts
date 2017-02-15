import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import { Events } from "ionic-angular";
import { Storage } from '@ionic/storage';

@Injectable()
export class UserData {
    HAS_LOGGED_IN = "hasLoggedIn";
    private hasLogin = false;

    constructor(private events: Events, private http: Http, public storage: Storage) {
        this.http = http;
    }

    login(user) {
        let payload = {
            username: user.username,
            password: user.password
        };
        let self = this;
        this.http.post("http://v401app.jingkoo.net/Login/index", payload)
            .map(response => response.json())
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
        let self = this;
        this.http.post("http://v401app.jingkoo.net/Login/register/step/one", payload)
            .map(response => response.json())
            .subscribe(
            data => {
                console.log(data)
                if (data.status = 1) {
                    self.setUsername(user.username);
                    self.setToken(data.data.token);
                    self.storage.set(this.HAS_LOGGED_IN, true);
                    self.events.publish("user:signupFirst", user.username);
                }
            },
            error => {
                self.events.publish("user:signupFirst:error");
            }
            );
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
