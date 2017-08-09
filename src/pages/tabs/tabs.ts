import { Component } from '@angular/core';
import { NavController, MenuController } from 'ionic-angular';
import { AboutPage } from '../about/about';
import { UserProfilePage } from '../user-profile/user-profile';
import { PnrStatusPage } from '../pnr-status/pnr-status';
import { UserLogin } from '../user-login/user-login';
import { AboutTrainPage } from '../about-train/about-train';
import { SeatAvailabilityPage } from '../seat-availability/seat-availability';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = SeatAvailabilityPage ;
  tab2Root = PnrStatusPage;
  tab3Root = AboutTrainPage;

  constructor(public navCtrl: NavController, private menu: MenuController) {
this.menu.swipeEnable(true);
  
}

 
}
