import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { SocialSharing } from '@ionic-native/social-sharing';
import { AppRate } from '@ionic-native/app-rate';

/*
Generated class for the CommonServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
    */
@Injectable()
export class CommonServiceProvider {
    appName = "My Rail";
    appMessage = "The one-stop application for Indian Railways train travelers. It is very fast and smooth and has more features like PNR status, train schedule, train running status, trains between stations, seat availability, etc.";
    appUrl = "https://play.google.com/store/apps/details?id=com.nsamsoft.myrail";
    appImg = "www/assets/imgs/screen.png";
    constructor(
        public http: Http,
        private socialSharing: SocialSharing,
        private appRate : AppRate
        ) {

    }

    shareApp(){
        let shr = {message:this.appMessage,subject:this.appName,url:this.appUrl,file:this.appImg,chooserTitle:this.appName};
        this.socialSharing.shareWithOptions(shr);
    }

    sharePnrStatus(key,data){
        let passengersList='';
        for(let passenger of data.passengers){
            passengersList += '\nPassenger '+passenger.no+'\nCurren Status: '+passenger.current_status+'\nCoach Position: '+passenger.coach_position+'\nBooking Status: '+passenger.booking_status;
        }
        console.log(passengersList);
        let msg = 'PNR: '+data.pnr+'\nTRAIN: '+data.train.name+'('+data.train.number+')'+
        '\nFROM: '+data.from_station.name+'('+data.from_station.code+')'+
        '\nTO: '+data.journey_class.name+'('+data.journey_class.code+')'+
        '\nCLASS: '+data.to_station.name+'('+data.to_station.code+')'+passengersList;
        switch (key) {
            case "whatsapp":
            //console.log(key,data);
            this.whatsappShare(msg);
            break;
            case "facebook":
            this.facebookShare(msg);
            break;
            case "twitter":
            this.twitterShare(msg);
            break;             

            default:
            console.log(key,data);
            this.otherShare(msg);
            break;
        }
    }

    whatsappShare(msg){
        this.socialSharing.shareViaWhatsApp(msg, null /*Image*/,this.appUrl )
        .then(()=>{
            console.log("whatsappShare Success");
        },
        ()=>{
            console.log("whatsappShare failed");
        })
    }

    twitterShare(msg){
        this.socialSharing.shareViaTwitter(msg,null /*Image*/,this.appUrl)
        .then(()=>{
            console.log("twitterShare Success");
        },
        ()=>{
            console.log("twitterShare failed");
        })
    }

    facebookShare(msg){
        this.socialSharing.shareViaFacebook(msg,null /*Image*/,this.appUrl)
        .then(()=>{
            console.log("facebookShare Success");
        },
        ()=>{
            console.log("facebookShare failed");
        })
    }

    otherShare(msg){
        this.socialSharing.share(msg,"My Rail"/*Subject*/,null/*File*/,this.appUrl)
        .then(()=>{
            console.log("otherShare Success");
        },
        ()=>{
            console.log("otherShare failed");
        })

    }

    rateApp(){
        this.appRate.promptForRating(true);
        this.appRate.preferences = {
            usesUntilPrompt: 3,
            storeAppURL: {
                ios: '',
                android: 'market://details?id=com.nsamsoft.myrail',
                windows: ''
            }
        };
        this.appRate.promptForRating(false);
    }

}
