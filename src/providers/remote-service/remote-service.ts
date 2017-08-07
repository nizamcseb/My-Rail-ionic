import { Injectable } from '@angular/core';
import { Http ,Response } from '@angular/http';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';

/*
Generated class for the RemoteServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
    */
@Injectable()
export class RemoteServiceProvider {
    public host = "prod";
    //public host = "dev";
    constructor(public http: Http) {
        console.log('Hello RemoteServiceProvider Provider');
    }
    //getApiUrl : string = "http://api.railwayapi.com/live/train/12605/doj/20170715/apikey/o951qjct/";

    getPnrStatus(pnrnumber: number) {

        if(this.host == "dev"){
            return this.http.get("assets/data/pnrstatus.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/pnr-status/pnr/"+pnrnumber+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());
        }


    }
    getAboutTrain(train) {

        if(this.host == "dev"){
            return this.http.get("assets/data/about-train.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/name-number/train/"+train+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());  
        }


    }
    searchTrain(train) {
        if(this.host == "dev"){
            return this.http.get("assets/data/train-search.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/suggest-train/train/"+train+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());
        }


    }
    searchStations(station) {
        if(this.host == "dev"){
            return this.http.get("assets/data/station-search.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/suggest-station/name/"+station+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json()); 
        }


    }
    trainBwStations(source,dest,date) {
        if(this.host == "dev"){
            return this.http.get("assets/data/train-bw-stations.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/between/source/"+source+"/dest/"+dest+"/date/"+date+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json()); 
        }


    }
    checkSeatAvailability(trainNumber,fromStation,toStation,sClass,rQuota,dateOfJrny) {
        if(this.host == "dev"){
            return this.http.get("assets/data/seat-availability.json")
            .map((res:Response) => res.json());
        }else{
            return  this.http.get("http://api.railwayapi.com/v2/check-seat/train/"+trainNumber+"/source/"+fromStation+"/dest/"+toStation+"/date/"+dateOfJrny+"/class/"+sClass+"/quota/"+rQuota+"/apikey/o951qjct/")
            .do((res : Response ) => console.log(res.json()))
            .map((res : Response ) => res.json());  
        }

    }

}


