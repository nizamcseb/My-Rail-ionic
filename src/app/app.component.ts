import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, App} from 'ionic-angular';
import { UserLogin } from '../pages/user-login/user-login';
import { Dashboard } from '../pages/dashboard/dashboard';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { UserProfilePage } from '../pages/user-profile/user-profile';
import { AboutPage } from '../pages/about/about';
import { Subject } from 'rxjs';
import { Storage } from '@ionic/storage';
import { AdmobServiceProvider } from '../providers/admob-service/admob-service';
import { CommonServiceProvider } from '../providers/common-service/common-service';

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

    rootPage: any;
    activePage = new Subject();  
    pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
    rightMenuItems: Array<{ icon: string, active: boolean }>;
    state: any;  
    public UserData: any = {};

    constructor(
        public platform: Platform,
        public menu: MenuController, 
        public statusBar: StatusBar, 
        public splashScreen: SplashScreen, 
        public push: Push,
        private storage: Storage,
        private admobService : AdmobServiceProvider,
        private commonService : CommonServiceProvider,
        private app: App
        ) {
        this.initializeApp();
        this.rightMenuItems = [
        { icon: 'home', active: true },
        { icon: 'alarm', active: false },
        { icon: 'analytics', active: false },
        { icon: 'archive', active: false },
        { icon: 'basket', active: false },
        { icon: 'body', active: false },
        { icon: 'bookmarks', active: false },
        { icon: 'camera', active: false },
        { icon: 'beer', active: false },
        { icon: 'power', active: false },
        ];

        this.pages = [
        { title: 'Home', component: TabsPage, active: true, icon: 'home' },
        { title: 'Profile', component: UserProfilePage, active: false, icon: 'person' },
        { title: 'Reward Video', component: 'rewardVideo', active: false, icon: 'people' },
        { title: 'Share App', component: 'shareApp', active: false, icon: 'share' }

        ];
        this.activePage.subscribe((selectedPage: any) => {
            this.pages.map(page => {
                page.active = page.title === selectedPage.title;
            });
        });
        this.admobService.showBannerAd();
    }
    initializeApp() {   
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.checkLogin();
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.menu.enable(false, 'right');
            this.registerPush();
        });
    }  
    checkLogin(){
        new Promise(resolve => {this.storage.get('uid').then((val) => {
            console.log('Your user is  ', val);
            if(val){
                console.log("true");
                this.rootPage = TabsPage;
                this.getUser(['displayName','email','photoURL']);
            }else{
                console.log("false");
                this.nav.setRoot(UserLogin);
            }

        });   
    });
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
    openPage(page){
        console.log('page',page);
        if(page.component == "rewardVideo"){
            this.admobService.showVideoAds();
        }else if(page.component == "shareApp"){            
            this.commonService.shareApp();
        }else{
            this.nav.setRoot(page.component);
            this.activePage.next(page);
        }

    }
    rightMenuClick(item) {
        this.rightMenuItems.map(menuItem => menuItem.active = false);
        item.active = true;
    }
    logout(){
        this.admobService.showInterstitialAds();
        this.storage.clear();
        this.app.getRootNav().setRoot(UserLogin);
    }        
}