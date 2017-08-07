import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav } from 'ionic-angular';
import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import {
  Push,
  PushToken
} from '@ionic/cloud-angular';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {  
  @ViewChild(Nav) nav: Nav;
  //rootPage:any = TabsPage; // Replace tabsPage with Welcome
  
  rootPage = TabsPage;
  
  
  pages: Array<{title: string,icon:string, component: any}>;
  constructor(
    public platform: Platform,
    public menu: MenuController, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen, 
    public push: Push
    ) {
    this.initializeApp();

    // set our app's pages
    this.pages = [
    { title: 'Dashbaord',icon:'home', component: Dashboard },
    { title: 'Logout',icon:'lock', component: UserLogin }
    ];

  }
  initializeApp() {   
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.registerPush();
    });
  }
  registerPush() {
    // Check that we are on a device
    if (this.platform.is('cordova')) {
      // Register push notifications with the push plugin
      this.push.register().then((t: PushToken) => {
        console.log('Generated Token' + JSON.stringify(t));
        // Save the user with Ionic's user auth service
        return this.push.saveToken(t);
      }).then( (t: PushToken) => {
        console.log('Token Saved', t);
        //this.listenForPush();
      }).catch( (err) => {
        console.log('Error Saving Token: ' , err);
      });
    }
  }
}