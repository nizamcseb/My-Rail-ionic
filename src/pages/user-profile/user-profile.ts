import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserLogin } from '../user-login/user-login';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

	public UserData: any = {};
  constructor(
   public navCtrl: NavController,
   public storage: Storage, 
   public app: App, 
   public navParams: NavParams) {
  }

  ionViewDidLoad() {

  	this.getUser(['displayName','email','photoURL']);
    console.log('ionViewDidLoad UserProfilePage ', this.UserData);
    
  }

  getUser(keys: string[]) {
  const promises = [];

  keys.forEach( key => promises.push(this.storage.get(key)) );

  return Promise.all(promises).then( values => {
    const result: any = {};
    
    values.map( (value, index) => { 
      result[keys[index]] = value; 
    });

    this.UserData = result;
    console.log(result);
    console.log(this.UserData);

    
  });
}

logout(){
        // Remove API token 
        
        this.storage.clear();
        this.app.getRootNav().setRoot(UserLogin);
    }

}
