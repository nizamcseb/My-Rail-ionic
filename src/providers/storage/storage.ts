import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage';

/*
Generated class for the StorageProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
	*/
@Injectable()
export class StorageProvider {

	constructor(public http: Http, private storage: Storage) {
	}

	saveUserInfo(data){  	
		try{
			console.log(data);
			this.storage.set('uid',data.uid);
			this.storage.set('displayName',data.displayName);
			this.storage.set('email',data.email);
			this.storage.set('emailVerified',data.emailVerified);
			this.storage.set('phoneNumber',data.phoneNumber);
			this.storage.set('photoURL',data.photoURL);

		}catch(error){

			console.log(error.message);

		}  	

	}




}
