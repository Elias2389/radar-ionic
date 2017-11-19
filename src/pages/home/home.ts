import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {MAPS_NAME_PLACE, MAPS_RADIUS_PLACES, MAPS_TYPE_PLACES} from "../../providers/constants/constants";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  radius:string = MAPS_RADIUS_PLACES;
  name:string = MAPS_NAME_PLACE;
  type:string = MAPS_TYPE_PLACES;

  constructor(public navCtrl: NavController) {

  }

}
