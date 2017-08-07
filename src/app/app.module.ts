import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { TabsPage } from '../pages/tabs/tabs';

import { UserLogin } from '../pages/user-login/user-login';
import { UserSignup } from '../pages/user-signup/user-signup';
import { UserForgotpassword } from '../pages/user-forgotpassword/user-forgotpassword';
import { Dashboard } from '../pages/dashboard/dashboard';
import { PnrStatusPage } from '../pages/pnr-status/pnr-status';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { AboutTrainPage } from '../pages/about-train/about-train';
import { SeatAvailabilityPage } from '../pages/seat-availability/seat-availability';
import { SearchStationModalPage } from '../pages/search-station-modal/search-station-modal';
import { AvailabilityModalPage } from '../pages/availability-modal/availability-modal';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthServiceProvider } from '../providers/auth-service/auth-service';
import { RemoteServiceProvider } from '../providers/remote-service/remote-service';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { IonicStorageModule } from '@ionic/storage';
import { AutoCompleteModule } from 'ionic2-auto-complete';

import {RlTagInputModule} from 'angular2-tag-input';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';

import firebase from 'firebase';
import {Facebook} from '@ionic-native/facebook';
import { StorageProvider } from '../providers/storage/storage';
export const firebaseConfig={
  apiKey: "AIzaSyC2hOdKJHP2ExvyeTEa33oNgksTRonEGFQ",
        authDomain: "my-rail-6d70f.firebaseio.com",
        databaseURL: "https://my-rail-6d70f.firebaseapp.com",
        storageBucket: "my-rail-6d70f.appspot.com",
        messagingSenderId: "117355753489"
}

export const ionicStorageConfig = {
  name: 'myrail',
         driverOrder: ['indexeddb', 'sqlite', 'websql']
}

const cloudSettings: CloudSettings = {
  'core': {
    'app_id': '9c79b89f'
  },
  'push': {
    'sender_id': '117355753489',
    'pluginConfig': {
      'ios': {
        'badge': true,
        'sound': true
      },
      'android': {
        'iconColor': '#343434'
      }
    }
  }
};
firebase.initializeApp(firebaseConfig);
@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    TabsPage,
    PnrStatusPage,
    UserProfilePage,
    AboutTrainPage,
    SeatAvailabilityPage,
    SearchStationModalPage,
    AvailabilityModalPage,
    DatePicker
  ],
  imports: [
    BrowserModule,
    IonicStorageModule.forRoot(ionicStorageConfig),    
    IonicModule.forRoot(MyApp),
    CloudModule.forRoot(cloudSettings),
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AutoCompleteModule,
    RlTagInputModule,
    HttpModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    UserLogin,
    UserSignup,
    UserForgotpassword,
    Dashboard,
    TabsPage,
    PnrStatusPage,
    UserProfilePage,
    AboutTrainPage,
    SeatAvailabilityPage,
    SearchStationModalPage,
    AvailabilityModalPage,
    DatePicker
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Facebook,
   [{provide: AuthServiceProvider, useClass: IonicErrorHandler, ErrorHandler},RemoteServiceProvider],
    StorageProvider
    
  ]
})
export class AppModule {}