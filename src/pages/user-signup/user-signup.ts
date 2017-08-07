import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Dashboard } from '../dashboard/dashboard';
import { UserLogin } from '../user-login/user-login';
import { UserForgotpassword } from '../user-forgotpassword/user-forgotpassword';
import { TabsPage } from '../tabs/tabs';

import {User} from '../../models/user';
import {AngularFireAuth} from "angularfire2/auth"

import {StorageProvider} from '../../providers/storage/storage';
import {AuthServiceProvider} from '../../providers/auth-service/auth-service';



@IonicPage()
@Component({
  selector: 'page-user-signup',
  templateUrl: 'user-signup.html',
})
export class UserSignup {

  user = {} as User;

  constructor(public authSP: AuthServiceProvider,public afAuth: AngularFireAuth, public navCtrl: NavController, public navParams: NavParams, public storageSp:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserSignup');
  }

  dashboardPage(){ this.navCtrl.push(Dashboard); }
  tabsPage(){ this.navCtrl.push(TabsPage); }
  loginPage(){ this.navCtrl.push(UserLogin);}
  forgotPasswordPage(){ this.navCtrl.push(UserForgotpassword);}

  fbSignUp(){
    
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
