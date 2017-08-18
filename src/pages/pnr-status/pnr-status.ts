import { Component } from '@angular/core';
import { NavController, App, LoadingController,Platform } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, Response } from '@angular/http';
import { Push, PushToken } from '@ionic/cloud-angular';
import { UserLogin } from '../user-login/user-login';
import {Storage} from '@ionic/storage';
import * as firebase from 'firebase/app';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';
import { CommonServiceProvider } from '../../providers/common-service/common-service';
/**
* Generated class for the PnrStatusPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
    selector: 'page-pnr-status',
    templateUrl: 'pnr-status.html',
})
export class PnrStatusPage {

    loader;
    public statusResult = [];
    private currentUser: firebase.User;
    public pnrnumber;
    constructor(
        private admobService : AdmobServiceProvider,
        public platform : Platform,
        public ldngCtrl: LoadingController,
        public navCtrl: NavController, 
        public app: App, 
        private remoteService : RemoteServiceProvider,
        public authSp : AuthServiceProvider,
        public push: Push,
        public commonService: CommonServiceProvider,
        private storage: Storage) {
        this.admobService.showInterstitialAds();
    }    




    pnrCheck(){
        if(this.pnrnumber && this.pnrnumber.length == 10){
            this.admobService.showInterstitialAds();
            this.getPnrStatus(this.pnrnumber);
            this.loader = this.ldngCtrl.create({
                content: "Please wait...",
            });
            this.loader.present();   
        }else{
            alert("Please enter correct PNR number");
        }

    }

    getPnrStatus(pnr){        
        new Promise(resolve => {this.remoteService.getPnrStatus(pnr).subscribe((data)=>{
            console.log('pnr-status = ',data); //504 and 304 invalid// 200 ok 
            if(data.response_code != 200){
                this.loader.dismiss();
                alert("Please check you PNR number or Try after sometime");
            }
            this.statusResult = data;            
            this.loader.dismiss();            

        });
    });
    }

    share(key){
        this.commonService.sharePnrStatus(key,this.statusResult);

    }
}
