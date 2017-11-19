import {Component, Input} from '@angular/core';

import { Geolocation } from '@ionic-native/geolocation';
import {GoogleMap, GoogleMapOptions, GoogleMaps, GoogleMapsEvent} from "@ionic-native/google-maps";
import {PlacesProvider} from "../../providers/places/places";


@Component({
  selector: 'map-radar',
  templateUrl: 'map-radar.html'
})
export class MapRadarComponent {

  //Input for insert data about map.
  @Input('radius') public radius:string;
  @Input('name') public name:string;
  @Input('type') public type:string;

  map: GoogleMap;
  mapElement: HTMLElement;
  placesObject: any = {};
  markers: any = [];

  constructor(private googleMaps: GoogleMaps,private geolocation: Geolocation, public placesProvider: PlacesProvider) {

    this.geolocation.getCurrentPosition().then((resp) => {
      // resp.coords.latitude
      // resp.coords.longitude
      this.loadMap(resp.coords.latitude,resp.coords.longitude);
    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }



  loadMap(latitude,longitude) {
    let lat = latitude,
      long = longitude;

    //Get by Id Map
    this.mapElement = document.getElementById('map');

    let mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude,
          lng: longitude
        },
        zoom: 18,
        tilt: 30
      },
    };

    //Create map
    this.map = this.googleMaps.create('map', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
      .then(() => {
        console.log('Map is ready!');

        // Now you can use all methods safely.
        this.map.addMarker({
          title: 'My position',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: latitude,
            lng: longitude
          }
        })

      });

    let dataPlaces = {
      'latitude': lat,
      'longitude':long,
      'radius': this.radius,
      'name'  : this.name,
      'type'  : this.type
    };

    this.placesProvider.getPlaces(dataPlaces).subscribe(
      response => {
        this.placesObject = response;
        for(let place of this.placesObject.results){
          console.log(place);
          this.map.addMarker({
            title: place.name,
            icon: {
              url: 'https://developers.google.com/maps/documentation/javascript/images/circle.png',
              scale: 10
            },
            animation: 'DROP',
            position: {
              lat: place.geometry.location.lat,
              lng: place.geometry.location.lng
            }
          })
        }
      },
      error => {
        console.log(error);
        //Error connection

      }
    );




  }




}
