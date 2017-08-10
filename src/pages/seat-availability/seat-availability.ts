import { Component } from '@angular/core';
import { NavController,LoadingController } from 'ionic-angular';
import { DatePicker } from 'ionic2-date-picker/ionic2-date-picker';
import { ModalController } from 'ionic-angular';
import { SearchStationModalPage } from '../search-station-modal/search-station-modal';
import { AvailabilityModalPage } from '../availability-modal/availability-modal';
import { RemoteServiceProvider } from '../../providers/remote-service/remote-service';

@Component({
	selector: 'page-seat-availability',
	templateUrl: 'seat-availability.html',
	providers: [ DatePicker ]
})
export class SeatAvailabilityPage {
	loader;
	dateOfJrny;
	stn_from_name;
	stn_to_name;
	stn_from_code;
	stn_to_code;
	public searchResult = [];
	sClass;
	rQuota= "GN";
	public seatAvailabilityResult = [];
	constructor(
		public navCtrl: NavController,
		private remoteService : RemoteServiceProvider,
		public modlCtrl: ModalController,
		public datePicker: DatePicker,
		public ldngCtrl : LoadingController) {
		this.datePicker.onDateSelected.subscribe( 
			(date) => {				
				console.log(date);				
				this.formatDate(date);
				console.log(this.dateOfJrny);
			});

	}
	showCalendar(){
		this.datePicker.showCalendar();
	}
	searchStation(key){
		console.log(key);
		let data = { 'key' : key };
		let searStnMdl = this.modlCtrl.create(SearchStationModalPage,data);
		searStnMdl.present();
		searStnMdl.onDidDismiss(data=>{ 
			console.log("Data =>", data);
			if(data && data.key == "from"){
				this.stn_from_name = data.stationName;
				this.stn_from_code = data.stationCode;

			}else if(data && data.key == "to"){
				this.stn_to_name = data.stationName;
				this.stn_to_code = data.stationCode;
			}
		})

	}
	searchTrains(){
		if(this.stn_from_code && this.stn_to_code && this.dateOfJrny){
			this.searchResult = [];
		this.sClass = "";
		this.Loader("start");
		console.log(this.stn_from_code,this.stn_to_code,this.dateOfJrny);
		new Promise(resolve => {this.remoteService.trainBwStations(this.stn_from_code,this.stn_to_code,this.dateOfJrny).subscribe((data)=>{
			console.log('about train = ',data);
			this.searchResult = data;
			this.Loader("stop");
		});
	});
	}else{
		alert("Please select all mandatory fields");
	}
		
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
	checkAvailability(trainName,trainNumber,fromStationName,fromStationCode,toStationName,toStationCode,srcDepTime,dstArrvlTime,totalDuration){

		if(this.sClass && this.rQuota){		
		this.Loader("start");
		console.log(trainName,trainNumber,fromStationName,fromStationCode,toStationName,toStationCode,srcDepTime,dstArrvlTime,totalDuration);
		new Promise(resolve => {this.remoteService.checkSeatAvailability(trainNumber,fromStationCode,toStationCode,this.sClass,this.rQuota,this.dateOfJrny).subscribe((data)=>{
			console.log('checkAvailability = ',data);
			this.seatAvailabilityResult = data;
			let trainDtls = {
				'trainName':trainName, 
				'trainNumber': trainNumber,
				'fromStationName':fromStationName,
				'fromStationCode':fromStationCode,
				'toStationName':toStationName,
				'toStationCode':toStationCode,
				'srcDepTime':srcDepTime,
				'dstArrvlTime':dstArrvlTime,
				'totalDuration':totalDuration
			}
			this.Loader("stop");
			let availabilityMdl = this.modlCtrl.create(AvailabilityModalPage,{'data':this.seatAvailabilityResult,'trainDtls':trainDtls});
			availabilityMdl.present();
		});
	});
	}else{
		alert("Please select all mandatory fields");
	}
	}
	getQuota(quota){
		this.rQuota = quota;
		console.log('quota ',quota);
	}
	getClass(sclass) {
		this.sClass = sclass; 
		console.log('classSelected ',sclass);
	}
	formatDate(date){
		this.dateOfJrny = new Date(date);
		let dd = this.dateOfJrny.getDate();
		let mm = this.dateOfJrny.getMonth()+1; //January is 0!

		let yyyy = this.dateOfJrny.getFullYear();
		if(dd<10){
			dd='0'+dd;
		} 
		if(mm<10){
			mm='0'+mm;
		} 
		this.dateOfJrny = dd+'-'+mm+'-'+yyyy;
	}

	onUpdateToggle(event){
		console.log('test ',event);
		if(event == true){
			this.remoteService.envi = "prod";
		}else{
			this.remoteService.envi = "dev";
		}
	}

}

