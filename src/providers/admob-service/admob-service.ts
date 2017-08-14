import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig,AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
Generated class for the AdmobServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
	*/
@Injectable()
export class AdmobServiceProvider {

isTesting = false;
//isTesting = true;

	constructor(public http: Http,
		private admobFree : AdMobFree,
		public platform: Platform) {
		console.log('Hello AdmobServiceProvider Provider');
	}
	showBannerAd(){
		const bannerConfig: AdMobFreeBannerConfig = {
			id: 'ca-app-pub-2564877565940708/4616499458',
			isTesting: this.isTesting,
			autoShow: true
		};
		if(this.platform.is('cordova')){			
			this.admobFree.banner.config(bannerConfig);

			this.admobFree.banner.prepare()
			.then(() => {
				this.admobFree.banner.show()
			})
			.catch(e => console.log(e));    
		}  
	}
	showInterstitialAds(){
		if(this.platform.is('cordova')){
			const InterstitialConfig: AdMobFreeInterstitialConfig = {
				id: 'ca-app-pub-2564877565940708/9050568484',
				isTesting: this.isTesting,
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
	showVideoAds(){
		if(this.platform.is('cordova')){
			const RewardVideoConfig: AdMobFreeRewardVideoConfig = {
				id: 'ca-app-pub-2564877565940708/9497947586',
				isTesting: this.isTesting,
				autoShow: true
			};
			this.admobFree.rewardVideo.config(RewardVideoConfig);

			this.admobFree.rewardVideo.prepare()
			.then(() => {
				this.admobFree.rewardVideo.show()
			})
			.catch(e => console.log(e));    
		}
	}
}
