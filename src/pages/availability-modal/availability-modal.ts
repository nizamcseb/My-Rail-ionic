import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';


@Component({
  selector: 'page-availability-modal',
  templateUrl: 'availability-modal.html',
})
export class AvailabilityModalPage {
public availabilityData = [];
public trainData = [];
  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController) {
    this.availabilityData = this.navParams.get('data');
  	this.trainData = this.navParams.get('trainDtls');
  	console.log('availabilityData = ',this.availabilityData,'trainData = ',this.trainData);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AvailabilityModalPage');
  }
  dismiss(){
  	this.viewCtrl.dismiss();
  }

}
