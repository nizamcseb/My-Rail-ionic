import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
  selector: 'page-search-station-modal',
  templateUrl: 'search-station-modal.html',
})
export class SearchStationModalPage {
public searchResult = [];
public searchFor;
  constructor(
   public navCtrl: NavController,
   public navParams: NavParams, 
   public viewCtrl: ViewController,
   private remoteService : RemoteServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchStationModalPage');
     console.log('passing data  =',this.navParams.get('key'));
     this.searchFor = this.navParams.get('key');
  }
  closeModal(){
  	this.viewCtrl.dismiss();
  }
  getStationList(station){          
    if(station.length >= 3){
      new Promise(resolve => {this.remoteService.searchStations(station).subscribe((data)=>{
        console.log('seasrch station = ',data);
        this.searchResult = data;
      });
    });

    }
  }
  selectedStation(stationName, staionCode){
  	console.log('selected station ',stationName +" "+ staionCode);
  	let data = {'key': this.searchFor, 'stationName': stationName, 'stationCode': staionCode};
  	this.viewCtrl.dismiss(data);
  }
  dismiss() {
    this.viewCtrl.dismiss();
  }

}
