import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { UserProfilePage } from '../user-profile/user-profile';
import { PnrStatusPage } from '../pnr-status/pnr-status';
import { UserLogin } from '../user-login/user-login';
import { AboutTrainPage } from '../about-train/about-train';
import { SeatAvailabilityPage } from '../seat-availability/seat-availability';
import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = PnrStatusPage;
  tab2Root = UserProfilePage;
  tab3Root = AboutPage;
  tab4Root = AboutTrainPage;
  tab5Root = SeatAvailabilityPage;

  constructor(private storage: Storage,public navCtrl: NavController) {

  this.checkLogin();
}

checkLogin(){
  new Promise(resolve => {this.storage.get('uid').then((val) => {
    console.log('Your user is  ', val);
    if(val){
      console.log("true");
    }else{
       console.log("false");
       this.navCtrl.setRoot(UserLogin);
    }
          
  });   
});
}
  
}
