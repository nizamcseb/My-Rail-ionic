import { Component } from '@angular/core';
import { NavController, ViewController, App, LoadingController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig } from '@ionic-native/admob-free';

/**
* Generated class for the AboutTrainPage page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/
@Component({
  selector: 'page-about-train',
  templateUrl: 'about-train.html',
})
export class AboutTrainPage {
  loader;
  public statusResult = [];
  public searchResult = [];

  constructor(private admobFree : AdMobFree , public viewCtrl: ViewController, private remoteService : RemoteServiceProvider,public ldngCtrl : LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutTrainPage');
  }

  getAboutTrain(train){
    this.showInterstitialAds();
    this.Loader("start");
    this.searchResult = [];
    //this.viewCtrl.dismiss(train);
    new Promise(resolve => {this.remoteService.getAboutTrain(train).subscribe((data)=>{
      console.log('about train = ',data);
      this.statusResult = data;
      this.Loader("stop");
    });
  });

  }

  getTrainList(train){          
    if(train.length >= 3){
      new Promise(resolve => {this.remoteService.searchTrain(train).subscribe((data)=>{
        console.log('seasrch train = ',data);
        this.searchResult = data;
      });
    });

    }
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

  chooseItem(item: any) {
    this.viewCtrl.dismiss(item);
  }

  Loader(key){
    if(key == "start"){
      this.loader = this.ldngCtrl.create({
        content: "Please wait...",
      });
      this.loader.present();
    }else if(key == "stop"){
      this.loader.dismiss();
    }
  }
  showInterstitialAds(){
    const InterstitialConfig: AdMobFreeInterstitialConfig = {
      id: 'ca-app-pub-2564877565940708/9050568484',
      isTesting: false,
      autoShow: true
    };
    this.admobFree.interstitial.config(InterstitialConfig);

    this.admobFree.interstitial.prepare()
    .then(() => {
      this.admobFree.interstitial.show()
    })
    .catch(e => console.log(e));    
  }

}
