import { Component } from '@angular/core';
import { NavController, App, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AuthServiceProvider } from '../../providers/auth-service/auth-service';
import { Http, Response } from '@angular/http';
import { Push, PushToken } from '@ionic/cloud-angular';
import { UserLogin } from '../user-login/user-login';

import {Storage} from '@ionic/storage';
import * as firebase from 'firebase/app';

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
    passengers = [];
    from_station = [];
    to_station = [];
    boarding_point = [];
    reservation_upto = [];
    train = [];
    journey_class = [];
    private currentUser: firebase.User;
    public pnrnumber;
    constructor(
        public ldngCtrl: LoadingController,
        public navCtrl: NavController, 
        public app: App, 
        private remoteService : RemoteServiceProvider,
        public authSp : AuthServiceProvider,
        public push: Push,
        private storage: Storage) {

    }    

    


    pnrCheck(){
        this.getPnrStatus(this.pnrnumber);
        this.loader = this.ldngCtrl.create({
            content: "Please wait...",
        });
        this.loader.present();        
    }

    getPnrStatus(pnr){
        new Promise(resolve => {this.remoteService.getPnrStatus(pnr).subscribe((data)=>{
            console.log('pnr-status = ',data); //504 and 304 invalid// 200 ok 
            if(data.response_code != 200){
                this.loader.dismiss();
                alert("Please check you PNR number or Try after sometime");
            }
            this.statusResult = data;            
            this.from_station = data.from_station;
            this.to_station = data.to_station;
            this.boarding_point = data.boarding_point;
            this.reservation_upto = data.reservation_upto;
            this.train = data.train;
            this.journey_class = data.journey_class;
            for(var i = 0; i < data.passengers.length; i++) {
                //console.log("passengers no=",data.passengers[i].no);
                this.passengers.push(
                {
                    no: data.passengers[i].no, 
                    coach_position: data.passengers[i].coach_position,
                    current_status: data.passengers[i].current_status,
                    booking_status: data.passengers[i].booking_status
                }
                );
            }
            this.loader.dismiss();            
            
        });
    });
    }


}
