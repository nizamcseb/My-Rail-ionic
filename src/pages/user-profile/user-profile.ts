import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { UserLogin } from '../user-login/user-login';
import { AlertController } from 'ionic-angular';
import firebase from 'firebase';

@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  public UserData: any = {displayName : null,email: null,photoURL: null,emailVerified: null};
  //public UserData = [displayName => null,email=> null,photoURL=> null,emailVerified=> null];
  userName;
  userEmail;
  userPhotoUrl;
  emailVerified;
  userPhone;

  constructor(
    public navCtrl: NavController,
    public storage: Storage, 
    public alertCtrl: AlertController,
    public app: App, 
    public navParams: NavParams) {
  }

  ionViewDidLoad() {

    this.getUser();
    console.log('ionViewDidLoad UserProfilePage ', this.UserData);    

  }

  getUser() {
    var user = firebase.auth().currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      this.userName = user.displayName;
      this.userEmail = user.email;
      this.userPhotoUrl = user.photoURL;
      this.emailVerified = user.emailVerified;
      this.userPhone = user.phoneNumber;
      //this.uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
      // this value to authenticate with your backend server, if
      // you have one. Use User.getToken() instead.
      console.log('user-profile ',user);
    }
  }  


 async verify(key: string){
    if(key === 'email'){

      var user = await firebase.auth().currentUser;

      user.sendEmailVerification().then(function() {
        //this.successAlert()
        alert('Verification link sent to your email address, please verify.');
      }).catch(function(error) {
        // An error happened.
        alert(error.message);
      });

    }
  }
  successAlert(){
    let confirm = this.alertCtrl.create({
      title: 'Success',
      message: 'Verification link sent to your email address, please verify.',
      buttons: [        
      {
        text: 'Ok',
        handler: () => {
          console.log('Agree clicked');
        }
      }
      ]
    });
    confirm.present();
  }
  logout(){
    this.storage.clear();
    this.app.getRootNav().setRoot(UserLogin);
  }

}
