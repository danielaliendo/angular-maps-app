import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';
import { Map, Marker} from "mapbox-gl";

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styles: [`
    div {
      width: 100%;
      height: 150px;
      margin: 0;
    }
  `]
})

export class MiniMapComponent implements AfterViewInit {

  @ViewChild('map') mapRef?: ElementRef
  @Input() lngLat?: [number, number]

  ngAfterViewInit(): void {
    if (!this.mapRef?.nativeElement) throw 'map div not found'
    if (!this.lngLat) throw 'lngLat can NOT be null'

    const map = new Map({
      container: this.mapRef?.nativeElement, // ref element
      style: 'https://api.maptiler.com/maps/basic-v2/style.json?key=isuv7z5lVm7U4p8srIAd', // style URL
      center: this.lngLat,
      zoom: 15,
      interactive: false
    });

    new Marker()
      .setLngLat(this.lngLat)
      .addTo(map)

  }


}
