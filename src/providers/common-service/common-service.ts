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
    switch (key) {
      case "whatsapp":
      console.log(key,data);
      break;
      case "sms":
      console.log(key,data);
      break;             

      default:
      console.log(key,data);
      break;
    }
  }

  whatsappShare(){
    this.socialSharing.shareViaWhatsApp(this.appMessage, null /*Image*/,  this.appUrl /* url */)
    .then(()=>{
      console.log("Success");
    },
    ()=>{
      console.log("failed")
    })
  }

  twitterShare(){
    this.socialSharing.shareViaTwitter(this.appMessage,null /*Image*/,this.appUrl)
    .then(()=>{
      console.log("Success");
    },
    ()=>{
      console.log("failed")
    })
  }

  facebookShare(){
    this.socialSharing.shareViaFacebook(this.appMessage,null /*Image*/,this.appUrl)
    .then(()=>{
      console.log("Success");
    },
    ()=>{
      console.log("failed")
    })
  }

  otherShare(){
    this.socialSharing.share("Genral Share Sheet",null/*Subject*/,null/*File*/,"http://pointdeveloper.com")
    .then(()=>{
      alert("Success");
    },
    ()=>{
      alert("failed")
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
