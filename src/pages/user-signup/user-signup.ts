import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { TabsPage } from '../tabs/tabs';

import {User} from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth";

import firebase from 'firebase';
import {Facebook} from '@ionic-native/facebook';
import { Platform } from 'ionic-angular';

import {StorageProvider} from '../../providers/storage/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';



@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {

  user = {} as User;
  userProfile: any = null;
  constructor(
    public authSP: AuthServiceProvider,
    public afAuth: AngularFireAuth, 
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public platform: Platform,
    public facebook:Facebook,
    public storageSp:StorageProvider
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  tabsPage(){ this.navCtrl.push(TabsPage); }
  loginPage(){ this.navCtrl.push(UserLogin);}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

  fbSignUp(){
    if (this.platform.is('cordova')) {
      this.facebook.login(['email']).then( (response) => {
        const facebookCredential = firebase.auth.FacebookAuthProvider
        .credential(response.authResponse.accessToken);

        firebase.auth().signInWithCredential(facebookCredential)
        .then((success) => {
          console.log("Firebase success: " + JSON.stringify(success));
          this.userProfile = success;
          this.storageSp.saveUserInfo(success);
          this.navCtrl.setRoot(TabsPage);            
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
  async signUp(user: User){

    try{
      const result = await this.afAuth.auth.createUserWithEmailAndPassword(user.email, user.password);
      console.log(result);
      if(result.uid){
        this.navCtrl.setRoot(TabsPage);
        //console.log(result);
        this.storageSp.saveUserInfo(result);
      }else{
        alert(result.message);
      }
    }catch(e){
      console.error(e);
      alert(e.message);
    }



  }
}
