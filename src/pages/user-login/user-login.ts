import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserSignup } from '../user-signup/user-signup';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { TabsPage } from '../tabs/tabs';

import firebase from 'firebase';
import {Facebook} from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

import {User} from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth"

import {StorageProvider} from '../../providers/storage/storage';


@IonicPage()
@Component({
  selector: 'page-user-login',
  templateUrl: 'user-login.html',
})
export class UserLogin {

  user = {} as User;

  userProfile: any = null;
  constructor(
    private afAuth: AngularFireAuth,
    public navCtrl: NavController,
    public navParams: NavParams,
    public platform: Platform,
    public facebook:Facebook,
    public storageSp:StorageProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserLogin');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  tabsPage(){ this.navCtrl.push(TabsPage); }
  signupPage(){ this.navCtrl.push(UserSignup); }
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword); }
  
  fbLogin(){ 
    if (this.platform.is('cordova')) {
    this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
            .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
            console.log("Firebase success: " + JSON.stringify(success));
            this.userProfile = success;
            this.navCtrl.setRoot(TabsPage);
            //console.log(result);
            this.storageSp.saveUserInfo(success);
        })
        .catch((error) => {
            console.log("Firebase failure: " + JSON.stringify(error));
            alert(error.message);
        });

    }).catch((error) => { console.log(error) }); 
    }else{
        alert("Not Cordova platform");
    }

  }

  async login(user: User){
    //alert("test");
    try{
        const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email,user.password);
        if(result.uid){
            this.navCtrl.setRoot(TabsPage);
            //console.log(result);
            this.storageSp.saveUserInfo(result);           
        }else{
            //alert("Invalid Email or Password");
        }        
        
    }catch(e){
          console.error(e);
          alert(e.message);
    }
  }

}
