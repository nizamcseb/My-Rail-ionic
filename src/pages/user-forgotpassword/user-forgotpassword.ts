import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserSignup } from '../user-signup/user-signup';
import { TabsPage } from '../tabs/tabs';

import {User} from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth"


@IonicPage()
@Component({
  selector: 'page-user-forgotpassword',
  templateUrl: 'user-forgotpassword.html',
})
export class UserForgotpassword {

  user = {} as User;

  constructor(public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserForgotpassword');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  tabsPage(){ this.navCtrl.push(TabsPage); }
  loginPage(){ this.navCtrl.push(UserLogin); }
  signupPage(){ this.navCtrl.push(UserSignup); }

  async resetPasswd(user: User){
    try{
      const result = await this.afAuth.auth.sendPasswordResetEmail(user.email);
      console.log(result);
      if(result){
      alert("Password reset link sent your registerd Email id successfully.");
      }
    }catch(e){
      console.error(e)
      alert(e.message);
    }
    

  }

}
