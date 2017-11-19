import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the PlacesProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class PlacesProvider {

  //Set your key into keyPlaces
  keyPlaces:string = 'AIzaSyCVMMti9CY656jc7UVg1hDIzoJ8eujw9to';
  urlPlaces:string;

  constructor(public http: HttpClient) {
    console.log('Hello PlacesProvider Provider');
  }

  //Method of get places selected
  getPlaces(dataPlaces){
    this.urlPlaces = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + dataPlaces.latitude + ','+ dataPlaces.longitude + '&radius=' + dataPlaces.radius + '&types=' + dataPlaces.type + '&name='+ dataPlaces.name +'&key=' + this.keyPlaces;
    return this.http.get(this.urlPlaces)
  }

}
