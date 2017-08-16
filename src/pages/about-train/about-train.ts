import { Component } from '@angular/core';
import { NavController, ViewController, App, LoadingController, Platform } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';
import { AdmobServiceProvider } from '../../providers/admob-service/admob-service';
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

  constructor(public platform : Platform, private admobService : AdmobServiceProvider, public viewCtrl: ViewController, private remoteService : RemoteServiceProvider,public ldngCtrl : LoadingController) {
  //this.admobService.showInterstitialAds();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AboutTrainPage');
  }

  getAboutTrain(train){
    this.admobService.showInterstitialAds();
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
}
