import { Injectable } from '@angular/core';
import { Http,Headers  } from '@angular/http';
import 'rxjs/add/operator/map';
import { App } from 'ionic-angular';

/*
Generated class for the AuthServiceProvider provider.

See https://angular.io/docs/ts/latest/guide/dependency-injection.html
for more info on providers and Angular DI.
  */
@Injectable()
export class AuthServiceProvider {
  constructor(
        ) {
    console.log('AuthServiceProvider');
    }
    
}
